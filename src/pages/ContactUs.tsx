import { Mail, Phone, MapPin, Linkedin, LucideInstagram, Facebook, Contact } from 'lucide-react';
import { useState } from 'react';

export default function ContactUs () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validate = () => {
    const newErrors: any = {};
    const alphaOnlyRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!alphaOnlyRegex.test(formData.name)) {
      newErrors.name = 'Name must contain only alphabets and spaces.';
    }
  
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
  
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (/[^a-zA-Z0-9\s]/.test(formData.subject)) {
      newErrors.subject = 'No special characters allowed in subject.';
    }
  
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const { name, email, subject, message } = formData;
    const body = `Hello Cubeesec,%0A%0AMy name is ${encodeURIComponent(name)}. ${encodeURIComponent(message)}%0A%0ABest regards,%0A${encodeURIComponent(name)}%0A${encodeURIComponent(email)}`;
    const mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=cubeesec.group@gmail.com&su=${encodeURIComponent(subject || 'Contact from Website')}&body=${body}`;

    window.open(mailLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-20 font-sans">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Contact className="w-8 h-8 text-white-400" />
        <h2 className="text-4xl font-bold bg-white bg-clip-text text-transparent">Contact Us</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg">
          <div>
            <label className="block text-sm mb-1 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Regarding..."
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Message</label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            ></textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-3 font-medium text-white rounded-lg transition-all bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Send via Gmail
          </button>
        </form>

        {/* Contact Details */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white-400">Address</h4>
              <p className="text-gray-300">
                Cubeesec groups, 2/220,<br />
                Pongupalayam, Kanalampalayam,<br />
                Tirupur, India
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <Phone className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white-400">Phone</h4>
              <p className="text-gray-300">+91 87904 07216</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-gray-700 rounded-lg">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white-400">Email</h4>
              <p className="text-gray-300">cubeesec.group@gmail.com</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-4">
            <h4 className="font-semibold text-lg text-purple-400 mb-3">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/cubeesec/" target="_blank" rel="noreferrer" className="p-2 bg-gray-700 rounded-lg hover:bg-cyan-400/20 transition-all">
                <LucideInstagram className="w-5 h-5 text-gray-300 hover:text-cyan-400 transition" />
              </a>
              <a href="https://www.facebook.com/people/CUBeeSec-Groups/61571294637347/" target="_blank" rel="noreferrer" className="p-2 bg-gray-700 rounded-lg hover:bg-cyan-400/20 transition-all">
                <Facebook className="w-5 h-5 text-gray-300 hover:text-cyan-400 transition" />
              </a>
              <a href="https://www.linkedin.com/company/cubeesec-securities/" target="_blank" rel="noreferrer" className="p-2 bg-gray-700 rounded-lg hover:bg-cyan-400/20 transition-all">
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-cyan-400 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}