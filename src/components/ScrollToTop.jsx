
import React, { useState, useEffect } from 'react';
// Falls useLocation nicht benötigt wird, entferne es, sonst importiere korrekt:
// import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);


  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 bg-[#bcdd88] text-white p-3 rounded-full shadow-lg hover:bg-[#53e08e] transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8 pointer-events-none'
      }`}
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default ScrollToTop;