export type ResumeAnalysis = {
  tailoredResume: string;
  atsScore: number;
  missingKeywords: string[];
  suggestions: string[];
};

/** LLMs sometimes wrap JSON in markdown fences or add stray text — pull out the first {...} block. */
export function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : raw;

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON object found in the model's response.");
  }

  return JSON.parse(candidate.slice(start, end + 1));
}

export function parseResumeAnalysis(raw: string): ResumeAnalysis {
  const data = extractJson(raw) as Partial<ResumeAnalysis>;

  if (
    typeof data.tailoredResume !== "string" ||
    typeof data.atsScore !== "number" ||
    !Array.isArray(data.missingKeywords) ||
    !Array.isArray(data.suggestions)
  ) {
    throw new Error("The model's response was missing required fields.");
  }

  return {
    tailoredResume: data.tailoredResume,
    atsScore: Math.max(0, Math.min(100, Math.round(data.atsScore))),
    missingKeywords: data.missingKeywords.filter((k): k is string => typeof k === "string").slice(0, 40),
    suggestions: data.suggestions.filter((s): s is string => typeof s === "string").slice(0, 20),
  };
}
