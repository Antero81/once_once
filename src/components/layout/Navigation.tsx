import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';
import { assets } from '@/assets';
import { getWhatsAppLink } from '@/config/contact';
import { useLanguage } from '@/hooks/useLanguage';

export const Navigation = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Travel', path: '/travel' },
    { label: 'Studio', path: '/studio' },
    { label: 'Corporate', path: '/corporate' },
    { label: 'Hubs', path: '/hubs' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#C5A059]/20 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={assets.common.logoHorizontal} alt="ONCE ONCE Logo" className="h-8 object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-[10px] uppercase tracking-[0.2em] font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                isActive(link.path)
                  ? 'text-[#C5A059]'
                  : 'text-white hover:text-[#C5A059]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language Selector */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              language === 'en'
                ? 'text-[#C5A059]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            EN
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={() => setLanguage('es')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              language === 'es'
                ? 'text-[#C5A059]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ES
          </button>
        </div>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-[#C5A059] hover:bg-[#C5A059]/10 transition-all rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
