export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  experience: number;
  rating: number;
  avatar: string;
  available: boolean;
  phone: string;
  email: string;
  workingHours: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  email: string;
  phone: string;
  bloodGroup: string;
  lastVisit: string;
  condition: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  doctorId: string;
  department: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "In Progress";
  reason: string;
  amount: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  tests: string[];
}

export interface Invoice {
  id: string;
  patientId: string;
  appointmentId: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  services: string[];
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Samuel Carter",
    specialization: "Cardiologist",
    department: "Cardiology",
    experience: 12,
    rating: 4.8,
    avatar: "SC",
    available: true,
    phone: "+1 555-0101",
    email: "doctor@hms.com",
    workingHours: "Mon-Fri 9AM-5PM",
  },
  {
    id: "d2",
    name: "Dr. Emily Watson",
    specialization: "Neurologist",
    department: "Neurology",
    experience: 9,
    rating: 4.7,
    avatar: "EW",
    available: true,
    phone: "+1 555-0102",
    email: "emily@hms.com",
    workingHours: "Mon-Sat 8AM-4PM",
  },
  {
    id: "d3",
    name: "Dr. James Patel",
    specialization: "Orthopedic Surgeon",
    department: "Orthopedics",
    experience: 15,
    rating: 4.9,
    avatar: "JP",
    available: false,
    phone: "+1 555-0103",
    email: "james@hms.com",
    workingHours: "Tue-Sat 10AM-6PM",
  },
  {
    id: "d4",
    name: "Dr. Sarah Kim",
    specialization: "Pediatrician",
    department: "Pediatrics",
    experience: 7,
    rating: 4.6,
    avatar: "SK",
    available: true,
    phone: "+1 555-0104",
    email: "sarah@hms.com",
    workingHours: "Mon-Fri 8AM-4PM",
  },
  {
    id: "d5",
    name: "Dr. Michael Brown",
    specialization: "General Physician",
    department: "General Medicine",
    experience: 10,
    rating: 4.5,
    avatar: "MB",
    available: true,
    phone: "+1 555-0105",
    email: "michael@hms.com",
    workingHours: "Mon-Sun 8AM-8PM",
  },
  {
    id: "d6",
    name: "Dr. Lisa Thompson",
    specialization: "Dermatologist",
    department: "Dermatology",
    experience: 8,
    rating: 4.7,
    avatar: "LT",
    available: true,
    phone: "+1 555-0106",
    email: "lisa@hms.com",
    workingHours: "Mon-Fri 9AM-5PM",
  },
];

export const patients: Patient[] = [
  {
    id: "p1",
    name: "Alice Johnson",
    age: 34,
    gender: "Female",
    email: "patient@hms.com",
    phone: "+1 555-0201",
    bloodGroup: "A+",
    lastVisit: "2024-12-10",
    condition: "Hypertension",
  },
  {
    id: "p2",
    name: "Bob Martinez",
    age: 45,
    gender: "Male",
    email: "bob@example.com",
    phone: "+1 555-0202",
    bloodGroup: "O-",
    lastVisit: "2024-12-05",
    condition: "Diabetes Type 2",
  },
  {
    id: "p3",
    name: "Carol White",
    age: 28,
    gender: "Female",
    email: "carol@example.com",
    phone: "+1 555-0203",
    bloodGroup: "B+",
    lastVisit: "2024-11-20",
    condition: "Migraine",
  },
  {
    id: "p4",
    name: "David Lee",
    age: 52,
    gender: "Male",
    email: "david@example.com",
    phone: "+1 555-0204",
    bloodGroup: "AB+",
    lastVisit: "2024-12-01",
    condition: "Knee Arthritis",
  },
  {
    id: "p5",
    name: "Emma Davis",
    age: 8,
    gender: "Female",
    email: "emma.parent@example.com",
    phone: "+1 555-0205",
    bloodGroup: "O+",
    lastVisit: "2024-12-08",
    condition: "Asthma",
  },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    patientName: "Alice Johnson",
    patientId: "p1",
    doctorName: "Dr. Samuel Carter",
    doctorId: "d1",
    department: "Cardiology",
    date: "2025-01-20",
    time: "10:00 AM",
    status: "Scheduled",
    reason: "Regular cardiac checkup",
    amount: 150,
  },
  {
    id: "a2",
    patientName: "Alice Johnson",
    patientId: "p1",
    doctorName: "Dr. Emily Watson",
    doctorId: "d2",
    department: "Neurology",
    date: "2024-12-15",
    time: "2:00 PM",
    status: "Completed",
    reason: "Headache and dizziness",
    amount: 200,
  },
  {
    id: "a3",
    patientName: "Bob Martinez",
    patientId: "p2",
    doctorName: "Dr. Michael Brown",
    doctorId: "d5",
    department: "General Medicine",
    date: "2025-01-18",
    time: "11:00 AM",
    status: "Scheduled",
    reason: "Diabetes management",
    amount: 120,
  },
  {
    id: "a4",
    patientName: "Carol White",
    patientId: "p3",
    doctorName: "Dr. Emily Watson",
    doctorId: "d2",
    department: "Neurology",
    date: "2024-12-20",
    time: "3:00 PM",
    status: "Cancelled",
    reason: "Severe migraine",
    amount: 200,
  },
  {
    id: "a5",
    patientName: "David Lee",
    patientId: "p4",
    doctorName: "Dr. James Patel",
    doctorId: "d3",
    department: "Orthopedics",
    date: "2025-01-22",
    time: "9:00 AM",
    status: "Scheduled",
    reason: "Knee pain follow-up",
    amount: 180,
  },
  {
    id: "a6",
    patientName: "Emma Davis",
    patientId: "p5",
    doctorName: "Dr. Sarah Kim",
    doctorId: "d4",
    department: "Pediatrics",
    date: "2025-01-19",
    time: "1:00 PM",
    status: "Scheduled",
    reason: "Asthma review",
    amount: 130,
  },
  {
    id: "a7",
    patientName: "Alice Johnson",
    patientId: "p1",
    doctorName: "Dr. Michael Brown",
    doctorId: "d5",
    department: "General Medicine",
    date: "2024-11-10",
    time: "9:30 AM",
    status: "Completed",
    reason: "Annual physical",
    amount: 100,
  },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "p1",
    date: "2024-12-15",
    doctor: "Dr. Emily Watson",
    diagnosis: "Tension Headache",
    prescription: "Ibuprofen 400mg, Sumatriptan 50mg",
    notes: "Patient reports stress-related headaches. Recommend relaxation techniques.",
    tests: ["MRI Brain", "Blood Pressure Monitoring"],
  },
  {
    id: "mr2",
    patientId: "p1",
    date: "2024-11-10",
    doctor: "Dr. Michael Brown",
    diagnosis: "Hypertension - Stage 1",
    prescription: "Lisinopril 10mg daily, Amlodipine 5mg",
    notes: "Blood pressure 145/92. Lifestyle modification advised.",
    tests: ["CBC", "Lipid Panel", "ECG"],
  },
  {
    id: "mr3",
    patientId: "p1",
    date: "2024-09-05",
    doctor: "Dr. Samuel Carter",
    diagnosis: "Mild Cardiac Arrhythmia",
    prescription: "Metoprolol 25mg twice daily",
    notes: "Holter monitor attached for 48 hours. Follow up in 6 weeks.",
    tests: ["Echocardiogram", "Holter Monitor"],
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv1",
    patientId: "p1",
    appointmentId: "a2",
    date: "2024-12-15",
    amount: 200,
    status: "Paid",
    services: ["Consultation", "MRI Scan", "Medication"],
  },
  {
    id: "inv2",
    patientId: "p1",
    appointmentId: "a7",
    date: "2024-11-10",
    amount: 100,
    status: "Paid",
    services: ["Consultation", "Blood Tests"],
  },
  {
    id: "inv3",
    patientId: "p1",
    appointmentId: "a1",
    date: "2025-01-20",
    amount: 150,
    status: "Pending",
    services: ["Consultation", "ECG"],
  },
];

export const departments = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
  "Dermatology",
  "Gynecology",
  "Oncology",
  "Emergency",
  "Radiology",
];

export const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM",
];

export const stats = {
  totalPatients: 1248,
  totalDoctors: 48,
  todayAppointments: 34,
  totalRevenue: 284500,
  monthlyGrowth: 12.5,
  appointmentCompletion: 87,
};
