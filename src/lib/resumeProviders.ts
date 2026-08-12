export type ProviderId = "groq" | "gemini" | "kimi" | "nvidia";

export const PROVIDERS: Record<ProviderId, { label: string; model: string }> = {
  groq: { label: "Groq (Llama 3.3)", model: "llama-3.3-70b-versatile" },
  gemini: { label: "Gemini", model: "gemini-1.5-flash" },
  kimi: { label: "Kimi (Moonshot AI)", model: "moonshot-v1-32k" },
  nvidia: { label: "NVIDIA NIM", model: "meta/llama-3.1-70b-instruct" },
};

const REQUEST_TIMEOUT_MS = 45_000;

class ProviderError extends Error {}

async function fetchWithTimeout(url: string, init: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** OpenAI-compatible chat completions endpoint, used by Groq, Kimi, and NVIDIA NIM. */
async function callOpenAiCompatible(baseUrl: string, model: string, apiKey: string, prompt: string) {
  const res = await fetchWithTimeout(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer and ATS (Applicant Tracking System) analyst. Respond with strict JSON only, no markdown fences, no commentary.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ProviderError(`Provider request failed (${res.status}): ${body.slice(0, 300)}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new ProviderError("Provider returned an unexpected response shape.");
  }
  return content;
}

async function callGemini(model: string, apiKey: string, prompt: string) {
  const res = await fetchWithTimeout(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "You are an expert resume writer and ATS (Applicant Tracking System) analyst. Respond with strict JSON only, no markdown fences, no commentary.\n\n" +
                  prompt,
              },
            ],
          },
        ],
        generationConfig: { temperature: 0.4 },
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ProviderError(`Provider request failed (${res.status}): ${body.slice(0, 300)}`);
  }

  const json = await res.json();
  const content = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof content !== "string") {
    throw new ProviderError("Provider returned an unexpected response shape.");
  }
  return content;
}

export async function callProvider(provider: ProviderId, apiKey: string, prompt: string): Promise<string> {
  const { model } = PROVIDERS[provider];

  switch (provider) {
    case "groq":
      return callOpenAiCompatible("https://api.groq.com/openai/v1", model, apiKey, prompt);
    case "kimi":
      return callOpenAiCompatible("https://api.moonshot.ai/v1", model, apiKey, prompt);
    case "nvidia":
      return callOpenAiCompatible("https://integrate.api.nvidia.com/v1", model, apiKey, prompt);
    case "gemini":
      return callGemini(model, apiKey, prompt);
    default: {
      const exhaustive: never = provider;
      throw new ProviderError(`Unsupported provider: ${exhaustive}`);
    }
  }
}
