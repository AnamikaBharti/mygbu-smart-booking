
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gbu-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.webp" 
              alt="GBU Logo" 
              className="h-12 w-12 bg-white rounded-full p-1"
            />
            <div>
              <h1 className="text-2xl font-bold">Gautam Buddha University</h1>
              <p className="text-gbu-gold text-sm">Facility Booking Portal</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#facilities" className="hover:text-gbu-gold transition-colors">Facilities</a>
            <a href="#booking" className="hover:text-gbu-gold transition-colors">Book Now</a>
            <a href="#dashboard" className="hover:text-gbu-gold transition-colors">Dashboard</a>
            <a href="#contact" className="hover:text-gbu-gold transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
