import {
  Stethoscope,
  Hospital,
  Home,
  FlaskConical,
  Ambulance,
  HeartHandshake,
} from "lucide-react";

export const categories = [
  {
    slug: "clinics",
    title: "Veterinary Clinics",
    description: "Routine checkups, vaccinations and everyday care from local vets.",
    icon: Stethoscope,
  },
  {
    slug: "hospitals",
    title: "Hospitals",
    description: "Surgery, intensive care and round-the-clock treatment.",
    icon: Hospital,
  },
  {
    slug: "boarding",
    title: "Boarding",
    description: "Safe stays for your pet when you're away.",
    icon: Home,
  },
  {
    slug: "diagnostics",
    title: "Diagnostics",
    description: "Lab tests, X-rays and ultrasound.",
    icon: FlaskConical,
  },
  {
    slug: "ambulances",
    title: "Ambulances",
    description: "Emergency transport for injured or sick animals.",
    icon: Ambulance,
  },
  {
    slug: "ngos",
    title: "NGOs & Welfare",
    description: "Rescue, adoption and community animal welfare organizations.",
    icon: HeartHandshake,
  },
];