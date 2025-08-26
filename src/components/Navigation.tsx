import React, { useState } from 'react';
import { Menu, X, FileText, Map, HelpCircle, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Technical Specs', href: '#specs', icon: <Settings className="w-4 h-4" /> },
    { name: 'Whitepaper', href: '#whitepaper', icon: <FileText className="w-4 h-4" /> },
    { name: 'Roadmap', href: '#roadmap', icon: <Map className="w-4 h-4" /> },
    { name: 'FAQ', href: '#faq', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 font-medium tracking-tight group"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all duration-300 font-medium tracking-tight group"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </span>
            {item.name}
          </a>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 hover:text-gray-900 transition-colors p-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl z-50 md:hidden">
          <div className="p-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 p-3 rounded-lg font-medium tracking-tight"
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};