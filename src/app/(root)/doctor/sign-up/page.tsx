"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';

interface DoctorSignupFormData {
  name: string;
  email: string;
  phone: string;
  speciality: string[];
  experience: string;
  clinicAddress: string;
  consultationFee: string;
  availability: string;
  qualifications: string;
  bio: string;
  password: string;
}

const DoctorSignup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<DoctorSignupFormData>({
    name: '',
    email: '',
    phone: '',
    speciality: [],
    experience: '',
    clinicAddress: '',
    consultationFee: '',
    availability: '',
    qualifications: '',
    bio: '',
    password: ''
  });

  const specializations = [
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Dermatology', label: 'Dermatology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Psychiatry', label: 'Psychiatry' },
    { value: 'Surgery', label: 'Surgery' },
    { value: 'General Medicine', label: 'General Medicine' },
    { value: 'Allergy and Immunology', label: 'Allergy and Immunology' },
    { value: 'Anesthesiology', label: 'Anesthesiology' },
    { value: 'Emergency Medicine', label: 'Emergency Medicine' },
    { value: 'Endocrinology', label: 'Endocrinology' },
    { value: 'Gastroenterology', label: 'Gastroenterology' },
    { value: 'Geriatrics', label: 'Geriatrics' },
    { value: 'Hematology', label: 'Hematology' },
    { value: 'Infectious Disease', label: 'Infectious Disease' },
    { value: 'Internal Medicine', label: 'Internal Medicine' },
    { value: 'Nephrology', label: 'Nephrology' }
  ];

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecialtyChange = (selectedOptions: any) => {
    setFormData({ ...formData, speciality: selectedOptions.map((option: any) => option.value) });
  };

  // const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const { files } = e.target;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     const imageData = new FormData();
  //     imageData.append('file', file);
  //     imageData.append('upload_preset', 'your_upload_preset'); // Use your own upload preset
  //     const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
  //       method: 'POST',
  //       body: imageData
  //     });
  //     const data = await response.json();
  //     setFormData({ ...formData, profileImage: data.secure_url });
  //   }
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/doctor/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log(formData);

      if (response.ok) {
        setSuccess('Doctor signed up successfully');
      } else {
        setError('Failed to sign up');
      }
    } catch (error: any) {
      setError('Failed to sign up: ' + error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-center">Loading...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-blue-100 flex">
        <div className="hidden md:block md:w-1/2 bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
        <div className="flex flex-col justify-center md:w-1/2 p-8 bg-white">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Doctor Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Full Name"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Phone Number"
                />
              </div>
              <div className='w-full'>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <Select
                  id="speciality"
                  name="speciality"
                  isMulti
                  options={specializations}
                  placeholder="Specialization"
                  value={specializations.filter(specialty => formData.speciality.includes(specialty.value))}
                  onChange={handleSpecialtyChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Years of Experience"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                <input
                  type="text"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Consultation Fee"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Clinic Address</label>
                <input
                  type="text"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Clinic Address"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Availability (e.g., Mon-Fri, 10am-5pm)"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                  placeholder="Qualifications"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 h-24"
                  placeholder="Brief Bio"
                />
              </div>
            </div>
            {/* <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
              />
            </div> */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900"
                placeholder="Password"
              />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorSignup;

