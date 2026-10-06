"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import {
  CANDIDATES,
  JOB_ROLES,
  parseResume,
  rankCandidates,
  type CandidateProfile,
} from "@/lib/dashboard/recruitmentData";

export function CandidateMatcher() {
  const [jobId, setJobId] = useState(JOB_ROLES[0].id);
  const [resumeText, setResumeText] = useState("");
  const [parsedStrengths, setParsedStrengths] = useState<string[] | null>(null);
  const job = JOB_ROLES.find((role) => role.id === jobId) ?? JOB_ROLES[0];
  const profiles = useMemo(() => {
    const pasted = resumeText.trim();

    if (!parsedStrengths || !pasted) {
      return CANDIDATES;
    }

    const uploaded: CandidateProfile = {
      id: "pasted-resume",
      name: "Pasted resume",
      title: "Uploaded profile",
      city: "UK desk",
      postcode: "",
      phone: "",
      resume: pasted,
    };

    return [uploaded, ...CANDIDATES];
  }, [parsedStrengths, resumeText]);
  const ranked = useMemo(() => rankCandidates(job, profiles), [job, profiles]);

  function handleParse() {
    const source = resumeText.trim();
    setParsedStrengths(source ? parseResume(source) : []);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          AI CANDIDATE ANALYZER & MATCHER
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          The parser extracts technical strengths from each resume and scores them against the job description.
        </p>
      </div>
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]">
      <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
          JOB DESCRIPTION
        </p>
        <label className="mt-3 block text-xs text-amfah-muted" htmlFor="job-role">
          Role
        </label>
        <select
          id="job-role"
          value={job.id}
          onChange={(event) => setJobId(event.target.value)}
          className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-surface px-3 py-2 text-sm text-white"
        >
          {JOB_ROLES.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </select>
        <p className="mt-3 text-sm font-medium text-white">{job.company}</p>
        <p className="text-xs text-amfah-muted">{job.location}</p>
        <p className="mt-3 text-sm leading-relaxed text-amfah-muted">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-amfah-gold/40 bg-amfah-gold/10 px-2 py-1 text-xs text-amfah-gold"
            >
              {skill}
            </span>
          ))}
        </div>

        <label className="mt-6 block text-xs font-semibold tracking-[0.14em] text-amfah-muted" htmlFor="resume-paste">
          PARSE A RESUME
        </label>
        <textarea
          id="resume-paste"
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
          placeholder="Paste resume text. The parser extracts skills on this page."
          rows={5}
          className="mt-2 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white placeholder:text-amfah-muted"
        />
        <Button type="button" fullWidth className="mt-3" onClick={handleParse}>
          EXTRACT SKILLS
        </Button>
        {parsedStrengths ? (
          <p className="mt-3 text-xs leading-relaxed text-amfah-muted">
            {parsedStrengths.length > 0
              ? `Extracted: ${parsedStrengths.join(", ")}`
              : "No listed technical skills found in that text."}
          </p>
        ) : null}
      </section>

      <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
        <div className="border-b border-amfah-border px-4 py-3 sm:px-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            RANKED MATCHES
          </p>
          <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
            {ranked.length} candidates scored against {job.title}
          </h2>
        </div>
        <ul className="amfah-scroll max-h-[640px] divide-y divide-amfah-border/80 overflow-y-auto">
          {ranked.map((candidate, index) => {
            const profile = profiles.find((item) => item.id === candidate.id);

            return (
              <li key={candidate.id} className="px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {index + 1}. {candidate.name}
                    </p>
                    <p className="mt-1 text-xs text-amfah-muted">
                      {profile
                        ? `${profile.title} · ${profile.city}${profile.postcode ? ` ${profile.postcode}` : ""}`
                        : "Uploaded profile"}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-amfah-gold">{candidate.score}%</p>
                </div>
                <p className="mt-3 text-xs text-amfah-muted">Key technical strengths</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.extracted.length > 0 ? (
                    candidate.extracted.map((skill) => {
                      const matched = candidate.strengths.some(
                        (strength) => strength.toLowerCase() === skill.toLowerCase(),
                      );

                      return (
                        <span
                          key={skill}
                          className={
                            matched
                              ? "rounded-md border border-emerald-500/40 bg-emerald-950/40 px-2 py-1 text-xs text-emerald-300"
                              : "rounded-md border border-amfah-border bg-amfah-black px-2 py-1 text-xs text-amfah-muted"
                          }
                        >
                          {skill}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-xs text-amfah-muted">No technical strengths extracted.</span>
                  )}
                </div>
                {candidate.missing.length > 0 ? (
                  <p className="mt-2 text-xs text-amfah-muted">
                    Missing: {candidate.missing.join(", ")}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
    </div>
  );
}
