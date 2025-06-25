
import React from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FacilityCard from '@/components/FacilityCard';
import FacilityFilters from '@/components/FacilityFilters';
import BookingCalendar from '@/components/BookingCalendar';
import BookingForm from '@/components/BookingForm';
import UserRoleSelector from '@/components/UserRoleSelector';
import { facilities } from '@/data/facilities';
import { Facility, BookingForm as BookingFormType } from '@/types/facility';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [filteredFacilities, setFilteredFacilities] = React.useState<Facility[]>(facilities);
  const [selectedFacility, setSelectedFacility] = React.useState<Facility | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [showBookingForm, setShowBookingForm] = React.useState(false);
  const [userRole, setUserRole] = React.useState<string>('outsider');
  const { toast } = useToast();

  // Mock data for booked and pending dates
  const bookedDates = ['2024-12-30', '2024-12-31', '2025-01-15'];
  const pendingDates = ['2025-01-02', '2025-01-10'];

  const handleFilterChange = (filters: any) => {
    let filtered = [...facilities];

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(facility => facility.type === filters.type);
    }

    if (filters.capacity && filters.capacity !== 'all') {
      const minCapacity = parseInt(filters.capacity);
      filtered = filtered.filter(facility => facility.capacity >= minCapacity);
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map((p: string) => 
        p.includes('+') ? Infinity : parseInt(p)
      );
      filtered = filtered.filter(facility => {
        const price = filters.season === 'peak' ? facility.rentRate.peak : facility.rentRate.offPeak;
        return price >= min && (max === Infinity ? true : price <= max);
      });
    }

    setFilteredFacilities(filtered);
  };

  const handleBookFacility = (facilityId: string) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      setSelectedFacility(facility);
      setSelectedDate(undefined);
      setShowBookingForm(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedFacility) {
      setShowBookingForm(true);
    }
  };

  const handleBookingSubmit = (booking: BookingFormType) => {
    console.log('Booking submitted:', booking);
    toast({
      title: "Booking Request Submitted",
      description: "Your booking request has been submitted for approval. You will receive a confirmation email shortly.",
    });
    
    // Reset form
    setSelectedFacility(null);
    setSelectedDate(undefined);
    setShowBookingForm(false);
  };

  const handleBookingCancel = () => {
    setShowBookingForm(false);
    setSelectedDate(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroBanner />
      
      <main className="container mx-auto px-4 py-12">
        {!selectedFacility ? (
          <>
            <UserRoleSelector 
              selectedRole={userRole} 
              onRoleChange={setUserRole} 
            />
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gbu-blue mb-8 text-center">
                Available Facilities
              </h2>
              <FacilityFilters onFilterChange={handleFilterChange} />
              
              {/* Auditoriums */}
              {(() => {
                const auditoriums = filteredFacilities.filter(f => f.type === 'auditorium');
                if (auditoriums.length === 0) return null;
                
                return (
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-gbu-blue mb-6">
                      Auditorium Facilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {auditoriums.map((facility) => (
                        <FacilityCard
                          key={facility.id}
                          facility={facility}
                          onBook={handleBookFacility}
                          userRole={userRole}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Conference Rooms */}
              {(() => {
                const conferenceRooms = filteredFacilities.filter(f => f.type === 'conference');
                if (conferenceRooms.length === 0) return null;
                
                return (
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-gbu-blue mb-6">
                      Conference Facilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {conferenceRooms.map((facility) => (
                        <FacilityCard
                          key={facility.id}
                          facility={facility}
                          onBook={handleBookFacility}
                          userRole={userRole}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Accommodation */}
              {(() => {
                const accommodation = filteredFacilities.filter(f => f.type === 'accommodation');
                if (accommodation.length === 0) return null;
                
                return (
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-gbu-blue mb-6">
                      Accommodation Facilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {accommodation.map((facility) => (
                        <FacilityCard
                          key={facility.id}
                          facility={facility}
                          onBook={handleBookFacility}
                          userRole={userRole}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Sports Facilities */}
              {(() => {
                const sports = filteredFacilities.filter(f => f.type === 'sports');
                if (sports.length === 0) return null;
                
                return (
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-gbu-blue mb-6">
                      Sports Facilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sports.map((facility) => (
                        <FacilityCard
                          key={facility.id}
                          facility={facility}
                          onBook={handleBookFacility}
                          userRole={userRole}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Dining Facilities */}
              {(() => {
                const dining = filteredFacilities.filter(f => f.type === 'dining');
                if (dining.length === 0) return null;
                
                return (
                  <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-gbu-blue mb-6">
                      Kitchen & Dining Facilities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {dining.map((facility) => (
                        <FacilityCard
                          key={facility.id}
                          facility={facility}
                          onBook={handleBookFacility}
                          userRole={userRole}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </section>
          </>
        ) : (
          <section className="max-w-6xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setSelectedFacility(null)}
                className="text-gbu-blue hover:text-gbu-darkBlue font-medium"
              >
                ← Back to Facilities
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BookingCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                bookedDates={bookedDates}
                pendingDates={pendingDates}
              />
              
              {showBookingForm && selectedDate && (
                <BookingForm
                  facility={selectedFacility}
                  selectedDate={selectedDate}
                  onSubmit={handleBookingSubmit}
                  onCancel={handleBookingCancel}
                />
              )}
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-gbu-blue text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Gautam Buddha University. All rights reserved.</p>
          <p className="mt-2 text-sm opacity-80">
            For technical support, contact: facilities@gbu.ac.in
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
