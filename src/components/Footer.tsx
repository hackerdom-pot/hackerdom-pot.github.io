import { Github, LucideInstagram, Linkedin, Mail, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CUBeeSEC
          </h3>

            <p className="text-gray-400">
              Protecting your digital assets with cutting-edge cybersecurity solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/cubeesec/" className="text-gray-400 hover:text-cyan-400 transition-colors" target='_blank'>
                <LucideInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/people/CUBeeSec-Groups/61571294637347" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/cubeesec-securities/posts/?feedView=all" className="text-gray-400 hover:text-cyan-400 transition-colors" target='_blank'>
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cubeesec.group@gmail.com&su=Subject%20Here&body=Hello%20Cubeesec!"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/corporate/about-us" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><Link to="/contact-us" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/web-application-penetration-testing" className="text-gray-400 hover:text-cyan-400 transition-colors">Web Application Penetration Testing</Link></li>
              <li><Link to="/services/mobile-application-penetration-testing" className="text-gray-400 hover:text-cyan-400 transition-colors">Mobile Application Penetration Testing</Link></li>
              <li><Link to="/services/api-penetration-testing" className="text-gray-400 hover:text-cyan-400 transition-colors">API Penetration Testing</Link></li>
              <li><Link to="/services/network-penetration-testing" className="text-gray-400 hover:text-cyan-400 transition-colors">Network Penetration Testing</Link></li>
              <li><Link to="/services/active-directory-penetration-testing" className="text-gray-400 hover:text-cyan-400 transition-colors">Active Directory Penetration Testing</Link></li>
              <li><Link to="/services/physical-security-testing" className="text-gray-400 hover:text-cyan-400 transition-colors">Physical Security Simulation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>2/220,</li>
              <li>Pongupalayam, Kanalampalayam</li>
              <li>Tirupur</li>
              <li>Phone: +91-8790407216</li>
              <li>Email: gokul@cubeesec.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CUBeeSEC Securities. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
