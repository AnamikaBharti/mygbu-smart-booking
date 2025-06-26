
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-gbu-blue to-gbu-darkBlue text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Facility Booking Portal
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
          Book auditoriums and conference halls at Gautam Buddha University
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className=" bg-gbu-gold text-black hover:bg-white hover:text-gbu-blue px-8 py-3"
          >
            Browse Facilities
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className=" bg-gbu-gold text-black hover:bg-white hover:text-gbu-blue px-8 py-3"
          >
            Check Availability
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
