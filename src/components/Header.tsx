
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gbu-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
       
       <div className="flex items-center justify-between">
           <div className="flex items-center space-x-4">
  <div className="h-12 w-12 rounded-full overflow-hidden bg-white  flex items-center justify-center">
    <img 
      src="/logo1.png" 
      alt="GBU Logo" 
      className="h-full w-full object-cover"
    />
  </div>
  <div>
    <h1 className="text-2xl text-white font-bold">Gautam Buddha University</h1>
    <p className="text-white text-sm">An Ultimate Destination For Higher Learning</p>
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
