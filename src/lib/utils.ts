import { type ClassValue, clsx } from "clsx"
import exp from "constants";
import { twMerge } from "tailwind-merge"
import * as z from 'zod'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ , 'Password must contain at least one uppercase letter, one lowercase letter, and one number').optional(),
  phoneNumber: z.string(),
  age: z.number().min(0).optional(),
  address: z.string().optional(),
  name: z.string().min(3),
  image: z.string().optional(),
  bloodGroup: z.string().optional(),
  height: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  diseases: z.array(z.string()).optional(),
  experience: z.string().optional(),
  consultationFee: z.number().min(0).optional(),
  availability: z.string().optional(),
  bio: z.string().optional(),
  department: z.string().optional(),
  specialty: z.array(z.string()).optional(),

})


export const doctorFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  department: z.string(),
  description: z.string(),
  phoneNumber: z.preprocess((val) => Number(val), z.number().min(6000000000).max(9999999999)),
  location: z.string(),
  image: z.string(),
  experience: z.string(),
  consultationFee: z.number().min(0),
  availability: z.string(),
  bio: z.string(),
  specialty: z.array(z.string()),

})

export const patientFormSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email(),
  phoneNumber: z.number().min(6000000000).max(9999999999).optional(),
  address: z.string().optional(),
  image: z.string().optional(),
  age: z.number().min(0).optional(),
  height: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  bloodGroup: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  diseases: z.array(z.string()).optional(),
})

export const appointmentFormSchema = z.object({
  patientName: z.string().min(3),
  patientEmail: z.string().email(),
  patientPhoneNumber: z.string().optional(),
  patientAddress: z.string(),
  patientImage: z.string().optional(),
  patientAge: z.number().min(0).optional(),
  patientHeight: z.number().min(0).optional(),
  patientWeight: z.number().min(0).optional(),
  patientBloodGroup: z.string().optional(),
  patientAllergies: z.array(z.string()).optional(),
  patientMedications: z.array(z.string()).optional(),
  patientBodyImage: z.string().optional(),
  patientPrescriptionImage: z.string().optional(),
  patientDiseases: z.array(z.string()).optional(),
  doctorName: z.string().min(3),
  doctorId: z.string().min(3),
  clinicAddress: z.string().min(2).optional(),
  startTimestamp: z.date().optional(),
  endTimestamp: z.date().optional(),
})


export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
