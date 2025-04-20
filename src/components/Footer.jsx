import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-[#CCCCCC] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">BRAND</h3>
            <p className="mb-4">Creating next-generation digital experiences that transform businesses and delight users.</p>
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="hover:text-[#F3CD01] transition-colors">👍</a>
              <a href="#" className="hover:text-[#F3CD01] transition-colors">🐦</a>
              <a href="#" className="hover:text-[#F3CD01] transition-colors">📸</a>
              <a href="#" className="hover:text-[#F3CD01] transition-colors">💼</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">3D Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Animation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>123 Innovation Street</li>
              <li>Tech City, TC 12345</li>
              <li>contact@example.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025 BRAND. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-[#F3CD01] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F3CD01] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F3CD01] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
