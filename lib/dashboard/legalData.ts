export type VaultFolder = "ma" | "litigation";

export type VaultFile = {
  id: string;
  reference: string;
  title: string;
  folder: VaultFolder;
  firm: string;
  city: string;
  postcode: string;
  phone: string;
  feeEarner: string;
  updated: string;
};

export type ClauseRule = {
  id: string;
  label: string;
  note: string;
  pattern: RegExp;
};

export type ClauseFinding = {
  id: string;
  label: string;
  note: string;
  excerpt: string;
};

export type ClauseRange = {
  start: number;
  end: number;
  id: string;
};

export type AuditKind = "time" | "interaction";

export type AuditDraft = {
  id: string;
  at: string;
  actor: string;
  matter: string;
  kind: AuditKind;
  detail: string;
  hours: number;
};

export type AuditEntry = AuditDraft & {
  previousHash: string;
  hash: string;
};

export const GENESIS_HASH = "0".repeat(64);

export const VAULT_FILES: VaultFile[] = [
  {
    id: "vf-1",
    reference: "MA-1042",
    title: "Project Meridian share purchase agreement",
    folder: "ma",
    firm: "City Commercial Solicitors",
    city: "London",
    postcode: "EC4M 7RB",
    phone: "020 7946 5202",
    feeEarner: "Helena Ward",
    updated: "18 Sep 2026",
  },
  {
    id: "vf-2",
    reference: "MA-1048",
    title: "Project Lark disclosure bundle",
    folder: "ma",
    firm: "Lincoln's Inn Counsel LLP",
    city: "London",
    postcode: "WC2A 3TL",
    phone: "020 7946 5101",
    feeEarner: "James Okoye",
    updated: "17 Sep 2026",
  },
  {
    id: "vf-3",
    reference: "MA-0988",
    title: "Scheme of arrangement board minutes",
    folder: "ma",
    firm: "Edinburgh Corporate Law",
    city: "Edinburgh",
    postcode: "EH3 8EX",
    phone: "0131 496 5404",
    feeEarner: "Fiona MacLeod",
    updated: "16 Sep 2026",
  },
  {
    id: "vf-4",
    reference: "MA-1104",
    title: "Warranty schedule, Birmingham buyer",
    folder: "ma",
    firm: "Birmingham Corporate Desk",
    city: "Birmingham",
    postcode: "B4 6AF",
    phone: "0121 496 5707",
    feeEarner: "Aisha Rahman",
    updated: "15 Sep 2026",
  },
  {
    id: "vf-5",
    reference: "MA-1110",
    title: "Data room index, Cambridge IP sale",
    folder: "ma",
    firm: "Cambridge IP Advisors",
    city: "Cambridge",
    postcode: "CB2 1TN",
    phone: "01223 496 0580",
    feeEarner: "Thomas Adeyemi",
    updated: "14 Sep 2026",
  },
  {
    id: "vf-6",
    reference: "MA-0961",
    title: "Locked-box accounts, Bristol property",
    folder: "ma",
    firm: "Bristol Property Practice",
    city: "Bristol",
    postcode: "BS1 6AD",
    phone: "0117 496 5505",
    feeEarner: "Callum Fraser",
    updated: "12 Sep 2026",
  },
  {
    id: "vf-7",
    reference: "LIT-2201",
    title: "Particulars of claim, Leeds supply dispute",
    folder: "litigation",
    firm: "Leeds Litigation Partners",
    city: "Leeds",
    postcode: "LS1 5HD",
    phone: "0113 496 5606",
    feeEarner: "Helena Ward",
    updated: "19 Sep 2026",
  },
  {
    id: "vf-8",
    reference: "LIT-2188",
    title: "Witness statement of R. Carter",
    folder: "litigation",
    firm: "Manchester Dispute Chambers",
    city: "Manchester",
    postcode: "M3 2WR",
    phone: "0161 496 5303",
    feeEarner: "James Okoye",
    updated: "18 Sep 2026",
  },
  {
    id: "vf-9",
    reference: "LIT-2140",
    title: "Tomlin order draft",
    folder: "litigation",
    firm: "Cardiff Commercial Firm",
    city: "Cardiff",
    postcode: "CF10 3DQ",
    phone: "029 2018 5909",
    feeEarner: "Aisha Rahman",
    updated: "11 Sep 2026",
  },
  {
    id: "vf-10",
    reference: "LIT-2094",
    title: "Counsel's opinion on breach",
    folder: "litigation",
    firm: "Lincoln's Inn Counsel LLP",
    city: "London",
    postcode: "WC2A 3TL",
    phone: "020 7946 5101",
    feeEarner: "Fiona MacLeod",
    updated: "10 Sep 2026",
  },
  {
    id: "vf-11",
    reference: "LIT-2077",
    title: "Costs budget, Precedent H",
    folder: "litigation",
    firm: "Newcastle Employment Law",
    city: "Newcastle",
    postcode: "NE1 4ST",
    phone: "0191 496 6010",
    feeEarner: "Callum Fraser",
    updated: "9 Sep 2026",
  },
  {
    id: "vf-12",
    reference: "LIT-2062",
    title: "Application notice N244",
    folder: "litigation",
    firm: "City Commercial Solicitors",
    city: "London",
    postcode: "EC4M 7RB",
    phone: "020 7946 5202",
    feeEarner: "Thomas Adeyemi",
    updated: "8 Sep 2026",
  },
];

export const FEE_EARNERS = [
  "Helena Ward",
  "James Okoye",
  "Aisha Rahman",
  "Callum Fraser",
  "Fiona MacLeod",
  "Thomas Adeyemi",
];

export const SAMPLE_CONTRACT = `SHARE PURCHASE AGREEMENT — PROJECT MERIDIAN
City Commercial Solicitors, London EC4M 7RB

1. Liability. The seller accepts unlimited liability for all warranty claims, including indirect loss.

2. Governing law. This agreement is governed by the laws of the State of New York, and the parties submit to the courts of New York.

3. Personal data. The buyer may transfer personal data to any country, including countries without a UK adequacy decision.

4. Confidentiality. The client waives solicitor confidentiality so the buyer may brief outside advisers without restriction.

5. Term. This engagement auto-renews for successive 36-month terms unless cancelled 14 days after renewal.

6. Indemnity. The seller shall indemnify without limitation against any claim arising from the data room.`;

export const CLAUSE_RULES: ClauseRule[] = [
  {
    id: "unlimited-liability",
    label: "Unlimited liability",
    note: "Liability is uncapped, including indirect loss.",
    pattern: /unlimited liability/gi,
  },
  {
    id: "foreign-law",
    label: "Non-standard governing law",
    note: "The clause leaves the law of England and Wales.",
    pattern: /laws of the State of New York/gi,
  },
  {
    id: "data-export",
    label: "Unrestricted data transfer",
    note: "Personal data may leave the UK without an adequacy decision.",
    pattern: /transfer personal data to any country/gi,
  },
  {
    id: "sra-confidentiality",
    label: "SRA confidentiality waiver",
    note: "Solicitor confidentiality is waived.",
    pattern: /waives solicitor confidentiality/gi,
  },
  {
    id: "auto-renew",
    label: "Non-standard renewal",
    note: "The engagement renews for 36 months with a short cancellation window.",
    pattern: /auto-renews for successive 36-month terms/gi,
  },
  {
    id: "open-indemnity",
    label: "Indemnity without a cap",
    note: "The indemnity has no financial limit.",
    pattern: /indemnify without limitation/gi,
  },
];

export const TIME_DRAFTS: AuditDraft[] = [
  {
    id: "tl-01",
    at: "2026-09-08T09:10:00.000Z",
    actor: "Thomas Adeyemi",
    matter: "LIT-2062 Application notice N244",
    kind: "time",
    detail: "Drafted the application notice and exhibit list.",
    hours: 1.4,
  },
  {
    id: "tl-02",
    at: "2026-09-09T11:05:00.000Z",
    actor: "Callum Fraser",
    matter: "LIT-2077 Costs budget, Precedent H",
    kind: "time",
    detail: "Prepared the Precedent H phases and assumptions.",
    hours: 2.2,
  },
  {
    id: "tl-03",
    at: "2026-09-10T14:40:00.000Z",
    actor: "Fiona MacLeod",
    matter: "LIT-2094 Counsel's opinion on breach",
    kind: "time",
    detail: "Reviewed counsel's opinion and marked instructions.",
    hours: 1.1,
  },
  {
    id: "tl-04",
    at: "2026-09-11T10:20:00.000Z",
    actor: "Aisha Rahman",
    matter: "LIT-2140 Tomlin order draft",
    kind: "time",
    detail: "Settled the schedule to the Tomlin order.",
    hours: 0.8,
  },
  {
    id: "tl-05",
    at: "2026-09-12T16:00:00.000Z",
    actor: "Callum Fraser",
    matter: "MA-0961 Locked-box accounts",
    kind: "time",
    detail: "Checked the locked-box leakage schedule.",
    hours: 1.6,
  },
  {
    id: "tl-06",
    at: "2026-09-14T09:30:00.000Z",
    actor: "Thomas Adeyemi",
    matter: "MA-1110 Data room index",
    kind: "time",
    detail: "Indexed the IP sale data room folders.",
    hours: 2.0,
  },
  {
    id: "tl-07",
    at: "2026-09-15T13:15:00.000Z",
    actor: "Aisha Rahman",
    matter: "MA-1104 Warranty schedule",
    kind: "time",
    detail: "Compared warranty caps with the heads of terms.",
    hours: 1.3,
  },
  {
    id: "tl-08",
    at: "2026-09-16T15:45:00.000Z",
    actor: "Fiona MacLeod",
    matter: "MA-0988 Scheme board minutes",
    kind: "time",
    detail: "Attended the board and wrote the minute.",
    hours: 1.8,
  },
  {
    id: "tl-09",
    at: "2026-09-17T08:50:00.000Z",
    actor: "James Okoye",
    matter: "MA-1048 Project Lark disclosure",
    kind: "time",
    detail: "Opened the disclosure bundle and logged access.",
    hours: 0.6,
  },
  {
    id: "tl-10",
    at: "2026-09-18T10:05:00.000Z",
    actor: "Helena Ward",
    matter: "MA-1042 Project Meridian SPA",
    kind: "time",
    detail: "Marked non-standard clauses in the SPA.",
    hours: 2.4,
  },
  {
    id: "tl-11",
    at: "2026-09-18T15:25:00.000Z",
    actor: "James Okoye",
    matter: "LIT-2188 Witness statement of R. Carter",
    kind: "time",
    detail: "Took the witness through the statement.",
    hours: 1.7,
  },
  {
    id: "tl-12",
    at: "2026-09-19T09:40:00.000Z",
    actor: "Helena Ward",
    matter: "LIT-2201 Particulars of claim",
    kind: "time",
    detail: "Settled the particulars and the prayer.",
    hours: 2.1,
  },
];

export function auditContract(text: string): {
  findings: ClauseFinding[];
  ranges: ClauseRange[];
} {
  const findings: ClauseFinding[] = [];
  const ranges: ClauseRange[] = [];

  for (const rule of CLAUSE_RULES) {
    rule.pattern.lastIndex = 0;
    const match = rule.pattern.exec(text);

    if (!match || match.index === undefined) {
      continue;
    }

    findings.push({
      id: rule.id,
      label: rule.label,
      note: rule.note,
      excerpt: match[0],
    });
    ranges.push({
      start: match.index,
      end: match.index + match[0].length,
      id: rule.id,
    });
  }

  ranges.sort((left, right) => left.start - right.start);

  return { findings, ranges };
}

export function canonicalAuditBody(entry: Omit<AuditEntry, "hash">): string {
  return JSON.stringify({
    id: entry.id,
    at: entry.at,
    actor: entry.actor,
    matter: entry.matter,
    kind: entry.kind,
    detail: entry.detail,
    hours: entry.hours,
    previousHash: entry.previousHash,
  });
}

const CLOSED_LOOP_SECRET = "amfah-sra-closed-loop";

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

async function closedLoopKey(): Promise<CryptoKey> {
  const material = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(CLOSED_LOOP_SECRET),
  );

  return crypto.subtle.importKey("raw", material, "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function encryptMatter(file: VaultFile): Promise<string> {
  const key = await closedLoopKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const payload = new TextEncoder().encode(
    JSON.stringify({
      title: file.title,
      firm: file.firm,
      feeEarner: file.feeEarner,
      city: file.city,
      postcode: file.postcode,
      phone: file.phone,
      updated: file.updated,
    }),
  );
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, payload),
  );
  const packed = new Uint8Array(iv.length + cipher.length);
  packed.set(iv, 0);
  packed.set(cipher, iv.length);

  return bytesToBase64(packed);
}

export async function sha256Hex(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function sealEntry(
  previousHash: string,
  draft: AuditDraft,
): Promise<AuditEntry> {
  const partial = { ...draft, previousHash };
  const hash = await sha256Hex(canonicalAuditBody(partial));

  return { ...partial, hash };
}

export async function sealChain(drafts: AuditDraft[]): Promise<AuditEntry[]> {
  const sealed: AuditEntry[] = [];
  let previousHash = GENESIS_HASH;

  for (const draft of drafts) {
    const entry = await sealEntry(previousHash, draft);
    sealed.push(entry);
    previousHash = entry.hash;
  }

  return sealed;
}

export async function verifyChain(entries: AuditEntry[]): Promise<boolean> {
  let previousHash = GENESIS_HASH;

  for (const entry of entries) {
    if (entry.previousHash !== previousHash) {
      return false;
    }

    const expected = await sha256Hex(canonicalAuditBody(entry));

    if (expected !== entry.hash) {
      return false;
    }

    previousHash = entry.hash;
  }

  return true;
}

export function billableHours(entries: AuditEntry[]): number {
  return entries.reduce((total, entry) => {
    return entry.kind === "time" ? total + entry.hours : total;
  }, 0);
}
