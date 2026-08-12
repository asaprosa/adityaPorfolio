import { NextResponse } from "next/server";
import { callProvider, PROVIDERS, type ProviderId } from "@/lib/resumeProviders";
import { parseResumeAnalysis } from "@/lib/extractJson";

export const runtime = "nodejs";

const MAX_INPUT_LENGTH = 20_000;
const PROVIDER_IDS = Object.keys(PROVIDERS) as ProviderId[];

type RequestPayload = {
  provider?: unknown;
  apiKey?: unknown;
  resume?: unknown;
  jobDescription?: unknown;
};

function buildPrompt(resume: string, jobDescription: string) {
  return `You will act as an ATS (Applicant Tracking System) analyst and professional resume writer.

Given the candidate's RESUME and a target JOB DESCRIPTION, do four things:
1. Rewrite/tailor the resume to better match the job description — same facts and experience, no fabrication, but reordered, reworded, and re-emphasized to align with the role.
2. Estimate an ATS compatibility score from 0-100 for the ORIGINAL resume against this job description, based on keyword overlap, structure, and relevance.
3. List important keywords/skills from the job description that are missing or underrepresented in the original resume.
4. Give concrete, actionable suggestions to improve the resume for this role (beyond just the missing keywords).

Respond with ONLY a JSON object in exactly this shape, no markdown fences, no extra commentary:
{
  "tailoredResume": "string, the rewritten resume as plain text",
  "atsScore": number between 0 and 100,
  "missingKeywords": ["string", ...],
  "suggestions": ["string", ...]
}

RESUME:
"""
${resume}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""`;
}

export async function POST(request: Request) {
  let payload: RequestPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const provider = typeof payload.provider === "string" ? payload.provider : "";
  const apiKey = typeof payload.apiKey === "string" ? payload.apiKey.trim() : "";
  const resume = typeof payload.resume === "string" ? payload.resume.trim() : "";
  const jobDescription = typeof payload.jobDescription === "string" ? payload.jobDescription.trim() : "";

  if (!PROVIDER_IDS.includes(provider as ProviderId)) {
    return NextResponse.json({ error: "Unknown or unsupported provider." }, { status: 400 });
  }
  if (!apiKey) {
    return NextResponse.json({ error: "An API key is required." }, { status: 400 });
  }
  if (!resume || !jobDescription) {
    return NextResponse.json({ error: "Resume and job description are both required." }, { status: 400 });
  }
  if (resume.length > MAX_INPUT_LENGTH || jobDescription.length > MAX_INPUT_LENGTH) {
    return NextResponse.json({ error: "Resume or job description is too long." }, { status: 400 });
  }

  try {
    const prompt = buildPrompt(resume, jobDescription);
    const raw = await callProvider(provider as ProviderId, apiKey, prompt);
    const analysis = parseResumeAnalysis(raw);
    return NextResponse.json(analysis);
  } catch (err) {
    // Never log the API key or raw request body — only a generic, key-free error.
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Resume builder provider error:", message);
    return NextResponse.json(
      { error: "The selected provider failed to generate a result. Check your API key and try again." },
      { status: 502 }
    );
  }
}
