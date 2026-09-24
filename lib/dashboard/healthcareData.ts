export type PrescriptionStatus = "Active" | "Dispensed" | "Review due";

export type Clinic = {
  id: string;
  name: string;
  city: string;
  postcode: string;
  phone: string;
  theatres: number;
  consultingRooms: number;
  beds: number;
  clinicsToday: number;
  consultants: number;
  nurses: number;
  imagingSlots: number;
  occupancy: number;
};

export type HistoryNote = {
  date: string;
  note: string;
};

export type Prescription = {
  drug: string;
  dose: string;
  status: PrescriptionStatus;
};

export type PatientRecord = {
  id: string;
  name: string;
  recordRef: string;
  born: string;
  city: string;
  postcode: string;
  phone: string;
  clinicId: string;
  clinician: string;
  history: HistoryNote[];
  prescriptions: Prescription[];
};

export type Clinician = {
  id: string;
  name: string;
  role: string;
  clinic: string;
  rotation: string;
  nextAppointment: string;
  phone: string;
};

export const CLINICIAN_MIN = 10;
export const CLINICIAN_MAX = 1000;
export const CLINICIAN_START = 86;

export const CLINICS: Clinic[] = [
  {
    id: "clinic-harley",
    name: "Harley Street Private",
    city: "London",
    postcode: "W1G 6AX",
    phone: "020 7946 9101",
    theatres: 2,
    consultingRooms: 14,
    beds: 18,
    clinicsToday: 22,
    consultants: 9,
    nurses: 24,
    imagingSlots: 16,
    occupancy: 78,
  },
  {
    id: "clinic-marylebone",
    name: "Marylebone Specialist Centre",
    city: "London",
    postcode: "W1U 3AA",
    phone: "020 7946 9102",
    theatres: 1,
    consultingRooms: 8,
    beds: 6,
    clinicsToday: 14,
    consultants: 5,
    nurses: 12,
    imagingSlots: 8,
    occupancy: 64,
  },
  {
    id: "clinic-manchester",
    name: "Manchester City Clinic",
    city: "Manchester",
    postcode: "M2 4WU",
    phone: "0161 496 9103",
    theatres: 2,
    consultingRooms: 11,
    beds: 20,
    clinicsToday: 18,
    consultants: 7,
    nurses: 19,
    imagingSlots: 12,
    occupancy: 71,
  },
  {
    id: "clinic-edinburgh",
    name: "Edinburgh Queensferry Practice",
    city: "Edinburgh",
    postcode: "EH2 2AF",
    phone: "0131 496 9104",
    theatres: 1,
    consultingRooms: 7,
    beds: 8,
    clinicsToday: 11,
    consultants: 4,
    nurses: 10,
    imagingSlots: 6,
    occupancy: 58,
  },
  {
    id: "clinic-bristol",
    name: "Bristol Harbour Clinic",
    city: "Bristol",
    postcode: "BS1 4QA",
    phone: "0117 496 9105",
    theatres: 1,
    consultingRooms: 9,
    beds: 12,
    clinicsToday: 15,
    consultants: 5,
    nurses: 14,
    imagingSlots: 9,
    occupancy: 66,
  },
  {
    id: "clinic-leeds",
    name: "Leeds Riverside Clinic",
    city: "Leeds",
    postcode: "LS1 4AP",
    phone: "0113 496 9106",
    theatres: 1,
    consultingRooms: 8,
    beds: 10,
    clinicsToday: 13,
    consultants: 4,
    nurses: 11,
    imagingSlots: 7,
    occupancy: 61,
  },
  {
    id: "clinic-birmingham",
    name: "Birmingham Colmore Clinic",
    city: "Birmingham",
    postcode: "B2 5LG",
    phone: "0121 496 7707",
    theatres: 1,
    consultingRooms: 10,
    beds: 14,
    clinicsToday: 16,
    consultants: 6,
    nurses: 16,
    imagingSlots: 8,
    occupancy: 69,
  },
  {
    id: "clinic-cambridge",
    name: "Cambridge Science Park Clinic",
    city: "Cambridge",
    postcode: "CB1 1AH",
    phone: "01223 496 0780",
    theatres: 1,
    consultingRooms: 6,
    beds: 4,
    clinicsToday: 9,
    consultants: 3,
    nurses: 8,
    imagingSlots: 5,
    occupancy: 54,
  },
  {
    id: "clinic-cardiff",
    name: "Cardiff Bay Clinic",
    city: "Cardiff",
    postcode: "CF10 2GA",
    phone: "029 2018 7909",
    theatres: 1,
    consultingRooms: 7,
    beds: 8,
    clinicsToday: 10,
    consultants: 3,
    nurses: 9,
    imagingSlots: 4,
    occupancy: 57,
  },
  {
    id: "clinic-reading",
    name: "Reading Forbury Clinic",
    city: "Reading",
    postcode: "RG1 3EU",
    phone: "0118 496 8010",
    theatres: 1,
    consultingRooms: 8,
    beds: 9,
    clinicsToday: 12,
    consultants: 4,
    nurses: 11,
    imagingSlots: 6,
    occupancy: 63,
  },
  {
    id: "clinic-glasgow",
    name: "Glasgow George Square Clinic",
    city: "Glasgow",
    postcode: "G1 3DX",
    phone: "0141 496 8111",
    theatres: 1,
    consultingRooms: 9,
    beds: 11,
    clinicsToday: 13,
    consultants: 4,
    nurses: 12,
    imagingSlots: 7,
    occupancy: 60,
  },
  {
    id: "clinic-newcastle",
    name: "Newcastle Quayside Clinic",
    city: "Newcastle",
    postcode: "NE1 5JF",
    phone: "0191 496 8212",
    theatres: 1,
    consultingRooms: 7,
    beds: 8,
    clinicsToday: 11,
    consultants: 3,
    nurses: 10,
    imagingSlots: 5,
    occupancy: 55,
  },
];

export const PATIENTS: PatientRecord[] = [
  {
    id: "pt-1",
    name: "Amira Shah",
    recordRef: "HC-10421",
    born: "14 Mar 1978",
    city: "London",
    postcode: "W1G 7HY",
    phone: "020 7946 9201",
    clinicId: "clinic-harley",
    clinician: "Dr Helena Ward",
    history: [
      { date: "12 Sep 2026", note: "Hypertension review. Home readings stable." },
      { date: "02 Jun 2026", note: "Annual private health screen completed." },
    ],
    prescriptions: [
      { drug: "Ramipril", dose: "5 mg once daily", status: "Active" },
      { drug: "Atorvastatin", dose: "20 mg at night", status: "Dispensed" },
    ],
  },
  {
    id: "pt-2",
    name: "Owen Blake",
    recordRef: "HC-10422",
    born: "9 Nov 1986",
    city: "London",
    postcode: "NW1 6XE",
    phone: "020 7946 9202",
    clinicId: "clinic-marylebone",
    clinician: "Dr James Okoye",
    history: [
      { date: "18 Sep 2026", note: "Knee clinic. MRI reviewed with the patient." },
      { date: "21 Aug 2026", note: "Physiotherapy referral issued." },
    ],
    prescriptions: [
      { drug: "Naproxen", dose: "250 mg twice daily", status: "Review due" },
    ],
  },
  {
    id: "pt-3",
    name: "Priya Nair",
    recordRef: "HC-10423",
    born: "3 Feb 1991",
    city: "Manchester",
    postcode: "M3 4LQ",
    phone: "0161 496 9203",
    clinicId: "clinic-manchester",
    clinician: "Dr Aisha Rahman",
    history: [
      { date: "16 Sep 2026", note: "Asthma review. Peak flow within plan." },
      { date: "11 Jan 2026", note: "Inhaler technique checked." },
    ],
    prescriptions: [
      { drug: "Salbutamol inhaler", dose: "1–2 puffs as required", status: "Active" },
      { drug: "Beclometasone inhaler", dose: "2 puffs twice daily", status: "Dispensed" },
    ],
  },
  {
    id: "pt-4",
    name: "Callum Reid",
    recordRef: "HC-10424",
    born: "27 Jul 1969",
    city: "Edinburgh",
    postcode: "EH3 8EX",
    phone: "0131 496 9204",
    clinicId: "clinic-edinburgh",
    clinician: "Dr Fiona MacLeod",
    history: [
      { date: "9 Sep 2026", note: "Type 2 diabetes review. HbA1c discussed." },
      { date: "9 Mar 2026", note: "Retinal screening attended." },
    ],
    prescriptions: [
      { drug: "Metformin", dose: "500 mg twice daily", status: "Active" },
    ],
  },
  {
    id: "pt-5",
    name: "Hannah Brooks",
    recordRef: "HC-10425",
    born: "19 May 1984",
    city: "Bristol",
    postcode: "BS8 1QU",
    phone: "0117 496 9205",
    clinicId: "clinic-bristol",
    clinician: "Dr Callum Fraser",
    history: [
      { date: "15 Sep 2026", note: "Migraine follow-up. Trigger diary reviewed." },
    ],
    prescriptions: [
      { drug: "Sumatriptan", dose: "50 mg at onset", status: "Dispensed" },
    ],
  },
  {
    id: "pt-6",
    name: "Daniel Okonkwo",
    recordRef: "HC-10426",
    born: "6 Dec 1975",
    city: "Leeds",
    postcode: "LS2 7EW",
    phone: "0113 496 9206",
    clinicId: "clinic-leeds",
    clinician: "Dr Thomas Adeyemi",
    history: [
      { date: "8 Sep 2026", note: "Cardiology outpatient. ECG unchanged." },
      { date: "4 Feb 2026", note: "Lipid clinic letter filed." },
    ],
    prescriptions: [
      { drug: "Bisoprolol", dose: "2.5 mg once daily", status: "Active" },
      { drug: "Aspirin", dose: "75 mg once daily", status: "Active" },
    ],
  },
  {
    id: "pt-7",
    name: "Sophie Grant",
    recordRef: "HC-10427",
    born: "22 Jan 1994",
    city: "London",
    postcode: "EC1A 4HD",
    phone: "020 7946 9207",
    clinicId: "clinic-harley",
    clinician: "Dr Helena Ward",
    history: [
      { date: "19 Sep 2026", note: "Dermatology review. Emollient plan continued." },
    ],
    prescriptions: [
      { drug: "Hydrocortisone cream", dose: "1% twice daily", status: "Review due" },
    ],
  },
  {
    id: "pt-8",
    name: "Lewis Murray",
    recordRef: "HC-10428",
    born: "30 Aug 1982",
    city: "Manchester",
    postcode: "M1 5JW",
    phone: "0161 496 9208",
    clinicId: "clinic-manchester",
    clinician: "Dr Aisha Rahman",
    history: [
      { date: "7 Sep 2026", note: "ENT clinic. Hearing test within normal limits." },
    ],
    prescriptions: [
      { drug: "Fluticasone nasal spray", dose: "2 sprays daily", status: "Dispensed" },
    ],
  },
  {
    id: "pt-9",
    name: "Grace Adeyemi",
    recordRef: "HC-10429",
    born: "11 Apr 1972",
    city: "London",
    postcode: "W1K 2HP",
    phone: "020 7946 9209",
    clinicId: "clinic-marylebone",
    clinician: "Dr James Okoye",
    history: [
      { date: "5 Sep 2026", note: "Thyroid clinic. Dose unchanged." },
      { date: "5 Mar 2026", note: "Bloods filed to the record." },
    ],
    prescriptions: [
      { drug: "Levothyroxine", dose: "75 micrograms daily", status: "Active" },
    ],
  },
  {
    id: "pt-10",
    name: "Finn Gallagher",
    recordRef: "HC-10430",
    born: "2 Oct 1988",
    city: "Edinburgh",
    postcode: "EH1 1YZ",
    phone: "0131 496 9210",
    clinicId: "clinic-edinburgh",
    clinician: "Dr Fiona MacLeod",
    history: [
      { date: "14 Sep 2026", note: "Sports medicine. Return-to-training note issued." },
    ],
    prescriptions: [
      { drug: "Ibuprofen", dose: "400 mg three times daily", status: "Review due" },
    ],
  },
  {
    id: "pt-11",
    name: "Maya Chen",
    recordRef: "HC-10431",
    born: "17 Jun 1990",
    city: "Bristol",
    postcode: "BS1 6AD",
    phone: "0117 496 9211",
    clinicId: "clinic-bristol",
    clinician: "Dr Callum Fraser",
    history: [
      { date: "10 Sep 2026", note: "Gastroenterology follow-up. Diet advice given." },
    ],
    prescriptions: [
      { drug: "Omeprazole", dose: "20 mg once daily", status: "Dispensed" },
    ],
  },
  {
    id: "pt-12",
    name: "Jack Hollis",
    recordRef: "HC-10432",
    born: "25 Dec 1964",
    city: "Leeds",
    postcode: "LS1 5HD",
    phone: "0113 496 9212",
    clinicId: "clinic-leeds",
    clinician: "Dr Thomas Adeyemi",
    history: [
      { date: "3 Sep 2026", note: "Respiratory clinic. No acute exacerbation." },
      { date: "3 Dec 2025", note: "Vaccination status confirmed." },
    ],
    prescriptions: [
      { drug: "Tiotropium inhaler", dose: "1 capsule daily", status: "Active" },
    ],
  },
];

export const CLINICIANS: Clinician[] = [
  {
    id: "cl-1",
    name: "Dr Helena Ward",
    role: "Consultant physician",
    clinic: "Harley Street Private",
    rotation: "Mon–Wed, London",
    nextAppointment: "22 Sep 2026, 09:10",
    phone: "020 7946 9301",
  },
  {
    id: "cl-2",
    name: "Dr James Okoye",
    role: "Consultant orthopaedic",
    clinic: "Marylebone Specialist Centre",
    rotation: "Tue–Thu, Marylebone",
    nextAppointment: "22 Sep 2026, 10:40",
    phone: "020 7946 9302",
  },
  {
    id: "cl-3",
    name: "Dr Aisha Rahman",
    role: "Consultant respiratory",
    clinic: "Manchester City Clinic",
    rotation: "Mon–Fri, Manchester",
    nextAppointment: "22 Sep 2026, 11:20",
    phone: "0161 496 9303",
  },
  {
    id: "cl-4",
    name: "Dr Fiona MacLeod",
    role: "Consultant endocrinology",
    clinic: "Edinburgh Queensferry Practice",
    rotation: "Wed–Fri, Edinburgh",
    nextAppointment: "23 Sep 2026, 09:00",
    phone: "0131 496 9304",
  },
  {
    id: "cl-5",
    name: "Dr Callum Fraser",
    role: "Consultant gastroenterology",
    clinic: "Bristol Harbour Clinic",
    rotation: "Mon, Wed, Fri",
    nextAppointment: "23 Sep 2026, 14:15",
    phone: "0117 496 9305",
  },
  {
    id: "cl-6",
    name: "Dr Thomas Adeyemi",
    role: "Consultant cardiology",
    clinic: "Leeds Riverside Clinic",
    rotation: "Tue–Thu, Leeds",
    nextAppointment: "24 Sep 2026, 08:45",
    phone: "0113 496 9306",
  },
  {
    id: "cl-7",
    name: "Nurse Priya Shah",
    role: "Clinic nurse",
    clinic: "Harley Street Private",
    rotation: "Early shift, London",
    nextAppointment: "22 Sep 2026, 08:30",
    phone: "020 7946 9307",
  },
  {
    id: "cl-8",
    name: "Nurse Owen Clarke",
    role: "Theatre nurse",
    clinic: "Manchester City Clinic",
    rotation: "Late shift, Manchester",
    nextAppointment: "22 Sep 2026, 13:00",
    phone: "0161 496 9308",
  },
  {
    id: "cl-9",
    name: "Dr Grace Adeyemi",
    role: "General practitioner",
    clinic: "Bristol Harbour Clinic",
    rotation: "Mon–Thu, Bristol",
    nextAppointment: "22 Sep 2026, 15:30",
    phone: "0117 496 9309",
  },
  {
    id: "cl-10",
    name: "Dr Finn Gallagher",
    role: "Sports physician",
    clinic: "Edinburgh Queensferry Practice",
    rotation: "Thu–Sat, Edinburgh",
    nextAppointment: "25 Sep 2026, 09:30",
    phone: "0131 496 9310",
  },
  {
    id: "cl-11",
    name: "Nurse Maya Chen",
    role: "Outpatient nurse",
    clinic: "Leeds Riverside Clinic",
    rotation: "Early shift, Leeds",
    nextAppointment: "22 Sep 2026, 09:50",
    phone: "0113 496 9311",
  },
  {
    id: "cl-12",
    name: "Dr Jack Hollis",
    role: "Consultant dermatology",
    clinic: "Marylebone Specialist Centre",
    rotation: "Fri, Marylebone",
    nextAppointment: "26 Sep 2026, 11:00",
    phone: "020 7946 9312",
  },
];

export type AppointmentLog = {
  id: string;
  when: string;
  patient: string;
  clinician: string;
  clinic: string;
  session: string;
};

export const APPOINTMENT_LOGS: AppointmentLog[] = [
  { id: "ap-1", when: "22 Sep 2026, 09:10", patient: "Amira Shah", clinician: "Dr Helena Ward", clinic: "Harley Street Private", session: "Hypertension review" },
  { id: "ap-2", when: "22 Sep 2026, 10:40", patient: "Owen Blake", clinician: "Dr James Okoye", clinic: "Marylebone Specialist Centre", session: "Knee clinic" },
  { id: "ap-3", when: "22 Sep 2026, 11:20", patient: "Priya Nair", clinician: "Dr Aisha Rahman", clinic: "Manchester City Clinic", session: "Asthma review" },
  { id: "ap-4", when: "23 Sep 2026, 09:00", patient: "Callum Reid", clinician: "Dr Fiona MacLeod", clinic: "Edinburgh Queensferry Practice", session: "Diabetes review" },
  { id: "ap-5", when: "23 Sep 2026, 14:15", patient: "Hannah Brooks", clinician: "Dr Callum Fraser", clinic: "Bristol Harbour Clinic", session: "Migraine follow-up" },
  { id: "ap-6", when: "24 Sep 2026, 08:45", patient: "Daniel Okonkwo", clinician: "Dr Thomas Adeyemi", clinic: "Leeds Riverside Clinic", session: "Cardiology outpatient" },
  { id: "ap-7", when: "22 Sep 2026, 15:10", patient: "Sophie Grant", clinician: "Dr Helena Ward", clinic: "Harley Street Private", session: "Dermatology review" },
  { id: "ap-8", when: "24 Sep 2026, 11:30", patient: "Lewis Murray", clinician: "Dr Aisha Rahman", clinic: "Manchester City Clinic", session: "ENT clinic" },
  { id: "ap-9", when: "25 Sep 2026, 10:00", patient: "Grace Adeyemi", clinician: "Dr James Okoye", clinic: "Marylebone Specialist Centre", session: "Thyroid clinic" },
  { id: "ap-10", when: "25 Sep 2026, 09:30", patient: "Finn Gallagher", clinician: "Dr Finn Gallagher", clinic: "Edinburgh Queensferry Practice", session: "Sports medicine" },
  { id: "ap-11", when: "26 Sep 2026, 13:20", patient: "Maya Chen", clinician: "Dr Callum Fraser", clinic: "Bristol Harbour Clinic", session: "Gastroenterology follow-up" },
  { id: "ap-12", when: "26 Sep 2026, 09:15", patient: "Jack Hollis", clinician: "Dr Thomas Adeyemi", clinic: "Leeds Riverside Clinic", session: "Respiratory clinic" },
];

export function clinicName(clinicId: string): string {
  return CLINICS.find((clinic) => clinic.id === clinicId)?.name ?? "Clinic";
}
