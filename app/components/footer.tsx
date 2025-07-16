'use client';
import { FaWhatsapp } from "react-icons/fa";
import Button from "../utils/button";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Subscription failed');
      }

      toast.success(result.message || 'Subscription successful!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: ''
      });

    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error instanceof Error ? error.message : 'Subscription failed. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-50 py-12 px-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Ways to Give Section */}
          <section className="space-y-6 md:text-left text-center">
            <h2 className="text-xl font-bold text-gray-800">Ways to Give</h2>
            <ul className="space-y-3">
              {['Sponsor a Child', 'Ways to Donate', 'Gift Catalog', 'Other ways to give'].map((itm, index) => (
                <li key={index} className="text-gray-600 hover:text-blue-600 transition-colors">
                  <a href="#">{itm}</a>
                </li>
              ))}
            </ul>
            <div className="flex justify-center md:justify-start">
              <Button />
            </div>
          </section>

          {/* Trust Section */}
          <section className="space-y-6 text-left">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <img 
                  src='/donateRelated/footer1.webp' 
                  alt='Trust badge' 
                  className="h-24 w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  An organization you can trust. When you give, 85% of every dollar goes straight to our mission. 
                  <a href="#" className="text-[#B23E3E] hover:underline ml-1">Find out more.</a>
                </p>
                <div className="flex gap-4">
                  <img src='/donateRelated/footer2.webp' alt='Certification 1' className="h-12 w-12 object-contain"/>
                  <img src='/donateRelated/footer3.webp' alt='Certification 2' className="h-12 w-12 object-contain"/>
                  <img src='/donateRelated/footer4.svg' alt='Certification 3' className="h-12 w-12 object-contain"/>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center gap-4">
              <h3 className="text-sm font-semibold text-gray-500">Reach out on</h3>
              <a
                href="https://wa.me/14703903270"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <FaWhatsapp className="text-green-600" size={24} />
                <span className="font-medium">Whatsapp</span>
              </a>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Join Over 650,000 Subscribers!</h2>
              <p className="text-gray-600 mt-2">
                Stay up to date on how God is working through our ministry.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First Name" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last Name" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#B23E3E] text-white font-medium py-2 px-6 rounded-md transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#9a3434]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;