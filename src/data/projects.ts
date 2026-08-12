export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  link?: string;
  linkLabel?: string;
  repo?: string;
  secondaryLink?: string;
  secondaryLinkLabel?: string;
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "qa-automation-engine",
    title: "Multi-Model AI & Risk-Scored QA Automation Engine",
    subtitle: "Internal QA tooling",
    description:
      "A risk-prioritization engine and serverless automation suite that cuts pre-test planning overhead by orchestrating multiple LLMs with resilient fallbacks.",
    tech: ["Node.js", "Vercel", "Playwright", "Groq", "Claude", "Gemini"],
    highlights: [
      "Architected a 7-factor usage-calibrated risk-scoring algorithm with dependency-graph traversal across 41 SaaS modules, backed by a 122-case node:test suite that cut pre-test planning overhead by 85%.",
      "Integrated Gemini, Claude, and Groq (Llama 3.3 70B) with exponential backoff, token-budget tuning, and prompt-calibration loops for multi-LLM resilience.",
      "Developed a Telegram-to-Trello automation webhook on Vercel handling custom Unicode/bidi text parsing.",
    ],
    images: [
      {
        src: "/images/projects/qa-tools-create-card.png",
        alt: "QA Tools — Create Test Card view, generating a Trello card with a grounded test plan from a pasted feature description",
      },
      {
        src: "/images/projects/qa-tools-release-summary.png",
        alt: "QA Tools — Release Summary view, reading the Trello board and generating release summaries plus a production changes log",
      },
      {
        src: "/images/projects/qa-tools-trello-card.png",
        alt: "The resulting Trello card — a generated test plan checklist, fully completed, tied to a real production feature",
      },
    ],
  },
  {
    slug: "ats-resume-tailor",
    title: "ATS Resume Tailor",
    subtitle: "Browser-only resume tailoring app",
    description:
      "A bring-your-own-key app that tailors a resume to a job description without inventing experience: it extracts what the JD actually requires, scores the resume against it, and generates a keyword-optimized, ATS-friendly LaTeX resume — plus a cover letter, interview prep, and a LinkedIn About, all grounded only in what you actually provide.",
    tech: ["React", "Vite", "JavaScript", "Kimi", "Gemini", "Groq", "NVIDIA NIM"],
    highlights: [
      "JD analysis extracts required/preferred skills, responsibilities, and ATS keywords from a pasted job description. Resume input supports PDF/DOCX/TXT upload — parsed entirely client-side via pdf.js and mammoth, never uploaded anywhere — or pasting directly.",
      "Scores the resume across ATS score, keyword match, and experience/skill/responsibility match, then generates a tailored resume as clean, ATS-friendly LaTeX (or fills in your own .tex template), plus a keyword report, missing-skills report, interview prep, cover letter, and LinkedIn About — each grounded only in the resume you provide.",
      "Multi-provider fallback tries Kimi, then Gemini, then Groq, then NVIDIA NIM — built after a real billing suspension on one provider mid-project, so no single provider outage blocks generation.",
      "Runs entirely in the browser with no backend: visitors bring their own free API key, stored only in localStorage and sent directly to the provider. Verified by grepping the production bundle for key-shaped strings, not just asserted.",
    ],
    repo: "https://github.com/AdityaGhodkeIesoftek/ResumeFromJD",
    link: "https://resumetemplatefromjd.vercel.app/",
    secondaryLink: "/resume-builder",
    secondaryLinkLabel: "Or try the lite demo built into this portfolio",
    images: [
      {
        src: "/images/projects/ats-resume-tailor-scorer.png",
        alt: "ATS Resume Tailor — ATS Resume tab showing the generated LaTeX resume alongside ATS score, keyword match, and skills gauges",
      },
      {
        src: "/images/projects/ats-resume-tailor-keywords.png",
        alt: "ATS Resume Tailor — Keyword Report tab listing job-description keywords, whether each is present in the resume, and where to place missing ones",
      },
      {
        src: "/images/projects/ats-resume-tailor-api-keys.png",
        alt: "ATS Resume Tailor — API Key Settings modal explaining the bring-your-own-key model across Gemini, Groq, NVIDIA NIM, and Kimi",
      },
    ],
  },
];
