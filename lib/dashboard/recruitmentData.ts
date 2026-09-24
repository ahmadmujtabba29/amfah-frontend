export type JobRole = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
};

export type CandidateProfile = {
  id: string;
  name: string;
  title: string;
  city: string;
  postcode: string;
  phone: string;
  resume: string;
};

export type PipelineStage =
  | "sourced"
  | "screened"
  | "interview"
  | "offer";

export type PipelineCard = {
  id: string;
  name: string;
  role: string;
  company: string;
  stage: PipelineStage;
};

export type CvRecord = {
  id: string;
  name: string;
  title: string;
  city: string;
  postcode: string;
  company: string;
  phone: string;
  skills: string[];
};

export const PIPELINE_STAGES: { id: PipelineStage; label: string }[] = [
  { id: "sourced", label: "Sourced" },
  { id: "screened", label: "Screened" },
  { id: "interview", label: "Interview Scheduled" },
  { id: "offer", label: "Offer Extended" },
];

export const JOB_ROLES: JobRole[] = [
  {
    id: "job-1",
    title: "Senior React Engineer",
    company: "Reading Tech Recruiters",
    location: "Reading, RG1 1AX",
    description:
      "Client needs a senior engineer for a UK payments desk. Must ship React and TypeScript, work with REST APIs, and mentor two mid-level developers.",
    requiredSkills: ["React", "TypeScript", "REST", "Mentoring"],
  },
  {
    id: "job-2",
    title: "Data Analyst",
    company: "Cambridge STEM Placements",
    location: "Cambridge, CB1 2JD",
    description:
      "Finance team wants SQL, Python, and dashboard work in Power BI. Stakeholder reporting each Monday.",
    requiredSkills: ["SQL", "Python", "Power BI", "Reporting"],
  },
  {
    id: "job-3",
    title: "Infrastructure Engineer",
    company: "Manchester Interim Desk",
    location: "Manchester, M2 3WQ",
    description:
      "Azure estate, Terraform, and on-call for a logistics client. Linux administration is required.",
    requiredSkills: ["Azure", "Terraform", "Linux", "On-call"],
  },
];

export const CANDIDATES: CandidateProfile[] = [
  {
    id: "can-1",
    name: "Amira Shah",
    title: "Senior Frontend Engineer",
    city: "Reading",
    postcode: "RG1 2LU",
    phone: "0118 496 4410",
    resume:
      "Amira Shah. Senior Frontend Engineer in Reading. Six years shipping React and TypeScript for a UK payments platform. Builds REST integrations, reviews pull requests, and mentors two developers. Previously used Next.js and Jest.",
  },
  {
    id: "can-2",
    name: "Owen Blake",
    title: "React Developer",
    city: "Bristol",
    postcode: "BS1 5AH",
    phone: "0117 496 4411",
    resume:
      "Owen Blake. React developer. Three years of React and JavaScript. Some TypeScript. Comfortable with REST. No people-management experience yet.",
  },
  {
    id: "can-3",
    name: "Priya Nair",
    title: "Data Analyst",
    city: "Cambridge",
    postcode: "CB2 1TN",
    phone: "01223 496 0441",
    resume:
      "Priya Nair. Data analyst in Cambridge. SQL daily, Python for cleaning, Power BI dashboards for a finance team. Writes the Monday stakeholder report.",
  },
  {
    id: "can-4",
    name: "Callum Reid",
    title: "Reporting Analyst",
    city: "Leeds",
    postcode: "LS1 4AP",
    phone: "0113 496 4413",
    resume:
      "Callum Reid. Excel and Power BI reporting. Light SQL. No Python. Supports a sales operations desk in Leeds.",
  },
  {
    id: "can-5",
    name: "Hannah Brooks",
    title: "Cloud Engineer",
    city: "Manchester",
    postcode: "M1 5JW",
    phone: "0161 496 4414",
    resume:
      "Hannah Brooks. Infrastructure engineer. Azure, Terraform, and Linux administration. Joins the on-call rota for a warehousing client.",
  },
  {
    id: "can-6",
    name: "Daniel Okonkwo",
    title: "Systems Administrator",
    city: "Birmingham",
    postcode: "B1 1TT",
    phone: "0121 496 4415",
    resume:
      "Daniel Okonkwo. Windows and Linux administration. Some Azure. No Terraform. Based in Birmingham.",
  },
  {
    id: "can-7",
    name: "Sophie Grant",
    title: "Full Stack Engineer",
    city: "London",
    postcode: "EC2A 4BX",
    phone: "020 7946 4416",
    resume:
      "Sophie Grant. React, TypeScript, and Node REST services for a City trading desk. Mentors graduates. Jest and Playwright coverage.",
  },
  {
    id: "can-8",
    name: "Lewis Murray",
    title: "BI Developer",
    city: "Edinburgh",
    postcode: "EH2 1JQ",
    phone: "0131 496 4417",
    resume:
      "Lewis Murray. Power BI and SQL models for a Scottish bank. Python notebooks for reconciliation. Writes monthly board reporting packs.",
  },
  {
    id: "can-9",
    name: "Grace Adeyemi",
    title: "Talent Partner",
    city: "London",
    postcode: "W1J 6BD",
    phone: "020 7946 4418",
    resume:
      "Grace Adeyemi. Talent partner in Mayfair. Boolean search, stakeholder management, and contract hiring for City desks. No engineering stack.",
  },
  {
    id: "can-10",
    name: "Finn Gallagher",
    title: "Contract Recruiter",
    city: "Glasgow",
    postcode: "G2 4JR",
    phone: "0141 496 4419",
    resume:
      "Finn Gallagher. Contract recruiter in Glasgow. Sourcing and CRM hygiene for interim engineering roles. No hands-on Azure or React delivery.",
  },
  {
    id: "can-11",
    name: "Maya Chen",
    title: "Interim Finance Analyst",
    city: "Cardiff",
    postcode: "CF10 2EF",
    phone: "029 2018 4420",
    resume:
      "Maya Chen. Interim finance analyst in Cardiff. Excel models, SQL extracts, and monthly reporting packs for a housing association.",
  },
  {
    id: "can-12",
    name: "Jack Hollis",
    title: "Azure Engineer",
    city: "Manchester",
    postcode: "M3 4LQ",
    phone: "0161 496 4421",
    resume:
      "Jack Hollis. Azure engineer. Linux administration and PowerShell automation for a northern logistics client. No Terraform yet.",
  },
];

export const PIPELINE_CARDS: PipelineCard[] = [
  { id: "pipe-1", name: "Amira Shah", role: "Senior React Engineer", company: "Reading Tech Recruiters", stage: "sourced" },
  { id: "pipe-2", name: "Owen Blake", role: "React Developer", company: "Bristol Career Bridge", stage: "sourced" },
  { id: "pipe-3", name: "Sophie Grant", role: "Full Stack Engineer", company: "Capital Contract Recruiters", stage: "sourced" },
  { id: "pipe-4", name: "Priya Nair", role: "Data Analyst", company: "Cambridge STEM Placements", stage: "screened" },
  { id: "pipe-5", name: "Callum Reid", role: "Reporting Analyst", company: "Leeds People Solutions", stage: "screened" },
  { id: "pipe-6", name: "Lewis Murray", role: "BI Developer", company: "Edinburgh Executive Search", stage: "screened" },
  { id: "pipe-7", name: "Hannah Brooks", role: "Infrastructure Engineer", company: "Manchester Interim Desk", stage: "interview" },
  { id: "pipe-8", name: "Daniel Okonkwo", role: "Systems Administrator", company: "Birmingham Temp Force", stage: "interview" },
  { id: "pipe-9", name: "Grace Adeyemi", role: "Talent Partner", company: "Mayfair Talent Partners", stage: "offer" },
  { id: "pipe-10", name: "Finn Gallagher", role: "Contract Recruiter", company: "Glasgow Hire Collective", stage: "offer" },
  { id: "pipe-11", name: "Maya Chen", role: "Interim Finance Analyst", company: "Cardiff Workforce Agency", stage: "sourced" },
  { id: "pipe-12", name: "Jack Hollis", role: "Azure Engineer", company: "Northern Staffing Hub", stage: "interview" },
];

export const CV_RECORDS: CvRecord[] = [
  { id: "cv-1", name: "Amira Shah", title: "Senior Frontend Engineer", city: "Reading", postcode: "RG1 2LU", company: "Reading Tech Recruiters", phone: "0118 496 4410", skills: ["React", "TypeScript", "REST", "Mentoring"] },
  { id: "cv-2", name: "Owen Blake", title: "React Developer", city: "Bristol", postcode: "BS1 5AH", company: "Bristol Career Bridge", phone: "0117 496 4411", skills: ["React", "JavaScript", "REST"] },
  { id: "cv-3", name: "Priya Nair", title: "Data Analyst", city: "Cambridge", postcode: "CB2 1TN", company: "Cambridge STEM Placements", phone: "01223 496 0441", skills: ["SQL", "Python", "Power BI", "Reporting"] },
  { id: "cv-4", name: "Callum Reid", title: "Reporting Analyst", city: "Leeds", postcode: "LS1 4AP", company: "Leeds People Solutions", phone: "0113 496 4413", skills: ["Power BI", "Excel", "SQL"] },
  { id: "cv-5", name: "Hannah Brooks", title: "Cloud Engineer", city: "Manchester", postcode: "M1 5JW", company: "Manchester Interim Desk", phone: "0161 496 4414", skills: ["Azure", "Terraform", "Linux", "On-call"] },
  { id: "cv-6", name: "Daniel Okonkwo", title: "Systems Administrator", city: "Birmingham", postcode: "B1 1TT", company: "Birmingham Temp Force", phone: "0121 496 4415", skills: ["Linux", "Azure", "Windows"] },
  { id: "cv-7", name: "Sophie Grant", title: "Full Stack Engineer", city: "London", postcode: "EC2A 4BX", company: "Capital Contract Recruiters", phone: "020 7946 4416", skills: ["React", "TypeScript", "REST", "Node", "Mentoring"] },
  { id: "cv-8", name: "Lewis Murray", title: "BI Developer", city: "Edinburgh", postcode: "EH2 1JQ", company: "Edinburgh Executive Search", phone: "0131 496 4417", skills: ["Power BI", "SQL", "Python", "Reporting"] },
  { id: "cv-9", name: "Grace Adeyemi", title: "Talent Partner", city: "London", postcode: "W1J 6BD", company: "Mayfair Talent Partners", phone: "020 7946 4418", skills: ["Boolean search", "Stakeholder management", "Contract"] },
  { id: "cv-10", name: "Finn Gallagher", title: "Contract Recruiter", city: "Glasgow", postcode: "G2 4JR", company: "Glasgow Hire Collective", phone: "0141 496 4419", skills: ["Contract", "Sourcing", "CRM"] },
  { id: "cv-11", name: "Maya Chen", title: "Interim Finance Analyst", city: "Cardiff", postcode: "CF10 2EF", company: "Cardiff Workforce Agency", phone: "029 2018 4420", skills: ["Excel", "Reporting", "SQL"] },
  { id: "cv-12", name: "Jack Hollis", title: "Azure Engineer", city: "Manchester", postcode: "M3 4LQ", company: "Northern Staffing Hub", phone: "0161 496 4421", skills: ["Azure", "Linux", "PowerShell"] },
];

const SKILL_DICTIONARY = [
  "React",
  "TypeScript",
  "JavaScript",
  "REST",
  "Mentoring",
  "SQL",
  "Python",
  "Power BI",
  "Reporting",
  "Azure",
  "Terraform",
  "Linux",
  "On-call",
  "Node",
  "Jest",
  "Next.js",
  "Excel",
  "Windows",
  "PowerShell",
];

export type ParsedCandidate = {
  id: string;
  name: string;
  score: number;
  strengths: string[];
  extracted: string[];
  missing: string[];
};

export function parseResume(resume: string): string[] {
  const text = resume.toLowerCase();
  return SKILL_DICTIONARY.filter((skill) => text.includes(skill.toLowerCase()));
}

export function rankCandidates(
  job: JobRole,
  profiles: CandidateProfile[],
): ParsedCandidate[] {
  return profiles
    .map((profile) => {
      const extracted = parseResume(profile.resume);
      const strengths = extracted.filter((skill) =>
        job.requiredSkills.some((required) => required.toLowerCase() === skill.toLowerCase()),
      );
      const missing = job.requiredSkills.filter(
        (required) =>
          !strengths.some((skill) => skill.toLowerCase() === required.toLowerCase()),
      );
      const score = Math.round((strengths.length / job.requiredSkills.length) * 100);

      return {
        id: profile.id,
        name: profile.name,
        score,
        strengths,
        extracted,
        missing,
      };
    })
    .sort((left, right) => right.score - left.score);
}

export function searchCvs(records: CvRecord[], query: string): CvRecord[] {
  const trimmed = query.trim();

  if (!trimmed) {
    return records;
  }

  return records.filter((record) => matchesRecord(record, trimmed));
}

function recordText(record: CvRecord): string {
  return [record.name, record.title, record.city, record.postcode, record.company, record.phone, ...record.skills]
    .join(" ")
    .toLowerCase();
}

function matchesRecord(record: CvRecord, query: string): boolean {
  const text = recordText(record);

  if (!/\b(AND|OR|NOT)\b/i.test(query)) {
    return query
      .toLowerCase()
      .split(/\s+/)
      .every((word) => text.includes(word));
  }

  return query.split(/\s+OR\s+/i).some((group) => {
    const tokens = group.trim().split(/\s+/).filter(Boolean);
    let excludeNext = false;
    const checks: boolean[] = [];

    for (const token of tokens) {
      if (/^AND$/i.test(token)) {
        continue;
      }

      if (/^NOT$/i.test(token)) {
        excludeNext = true;
        continue;
      }

      const word = token.toLowerCase();
      checks.push(excludeNext ? !text.includes(word) : text.includes(word));
      excludeNext = false;
    }

    return checks.length > 0 && checks.every(Boolean);
  });
}

export function isBooleanQuery(query: string): boolean {
  return /\b(AND|OR|NOT)\b/i.test(query);
}
