
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Facility } from '@/types/facility';
import { User, Calendar, Phone, Mail } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import FacilityAccordion from './FacilityAccordion';
import PricingTable from './PricingTable';
import DownloadablePdfs from './DownloadablePdfs';

interface FacilityCardProps {
  facility: Facility;
  onBook: (facilityId: string) => void;
  userRole?: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onBook, userRole = 'outsider' }) => {
  const getCapacityLabel = () => {
    if (facility.type === 'guesthouse' || facility.type === 'accommodation') {
      return 'guests';
    }
    return 'seats';
  };

  const getFacilityTypeLabel = () => {
    switch (facility.type) {
      case 'guesthouse':
      case 'accommodation':
        return 'Guest House';
      case 'dining':
        return 'Dining';
      case 'sports':
        return 'Sports';
      case 'auditorium':
        return 'Auditorium';
      case 'conference':
        return 'Conference';
      default:
        return facility.type.charAt(0).toUpperCase() + facility.type.slice(1);
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-200">
      <CardHeader className="p-0">
        <div className="relative">
          <ImageCarousel 
            images={facility.images} 
            facilityName={facility.name}
            autoPlay={true}
          />
          <Badge className="absolute top-4 right-4 bg-gbu-blue text-white">
            {getFacilityTypeLabel()}
          </Badge>
          {facility.roomCount && (
            <Badge className="absolute top-4 left-4 bg-green-600 text-white">
              {facility.roomCount} rooms
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-3 text-gbu-blue flex items-center justify-between">
          {facility.name}
          {facility.category && (
            <Badge variant="outline" className="text-xs">
              Category {facility.category}
            </Badge>
          )}
        </CardTitle>
        
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="text-sm">
              {facility.capacity} {getCapacityLabel()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Available</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          {facility.description}
        </p>

        {facility.inCharge && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gbu-blue mb-2">In-Charge Contact</h4>
            <div className="space-y-1 text-sm">
              <div className="font-medium">{facility.inCharge.name}</div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>{facility.inCharge.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>{facility.inCharge.email}</span>
              </div>
            </div>
          </div>
        )}

        <PricingTable 
          rentRate={facility.rentRate}
          capacity={facility.capacity}
          timeSlots={facility.timeSlots}
          userRole={userRole}
          roomCount={facility.roomCount}
        />

        {facility.downloadablePdfs && (
          <DownloadablePdfs pdfs={facility.downloadablePdfs} />
        )}
        
        <FacilityAccordion 
          bookingGuidelines={facility.bookingGuidelines}
          termsConditions={facility.termsConditions}
          cancellationPolicy={facility.cancellationPolicy}
        />
      </CardContent>
      
      <CardFooter className="p-6 pt-0 space-y-2">
        <Button 
          onClick={() => onBook(facility.id)}
          className="w-full bg-gbu-blue hover:bg-gbu-darkBlue text-white font-medium"
        >
          Book Now
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-gbu-blue text-gbu-blue hover:bg-gbu-lightBlue">
              View More Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gbu-blue">{facility.name} - Detailed Information</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <ImageCarousel 
                images={facility.images} 
                facilityName={facility.name}
                autoPlay={false}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gbu-blue mb-3">Facility Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Capacity:</strong> {facility.capacity} {getCapacityLabel()}</div>
                    <div><strong>Type:</strong> {getFacilityTypeLabel()}</div>
                    {facility.category && <div><strong>Category:</strong> {facility.category}</div>}
                    {facility.roomCount && <div><strong>Available Rooms:</strong> {facility.roomCount}</div>}
                  </div>
                  
                  <h4 className="font-semibold text-gbu-blue mt-4 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {facility.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <PricingTable 
                  rentRate={facility.rentRate}
                  capacity={facility.capacity}
                  timeSlots={facility.timeSlots}
                  userRole={userRole}
                  roomCount={facility.roomCount}
                />
              </div>

              {facility.downloadablePdfs && (
                <DownloadablePdfs pdfs={facility.downloadablePdfs} />
              )}
              
              <FacilityAccordion 
                bookingGuidelines={facility.bookingGuidelines}
                termsConditions={facility.termsConditions}
                cancellationPolicy={facility.cancellationPolicy}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default FacilityCard;
