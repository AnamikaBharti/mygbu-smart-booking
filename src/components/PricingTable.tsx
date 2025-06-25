
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingTableProps {
  rentRate: {
    peak: number;
    offPeak: number;
    halfDay?: number;
    fullDay?: number;
    employee?: number;
    student?: number;
    outsider?: number;
  };
  capacity: number;
  timeSlots?: string[];
  userRole?: string;
  roomCount?: number;
}

const PricingTable: React.FC<PricingTableProps> = ({
  rentRate,
  capacity,
  timeSlots,
  userRole = 'outsider',
  roomCount
}) => {
  const getRoleBasedPrice = () => {
    switch (userRole) {
      case 'employee':
        return rentRate.employee || rentRate.peak;
      case 'student':
        return rentRate.student || rentRate.offPeak;
      default:
        return rentRate.outsider || rentRate.peak;
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gbu-blue">
          Pricing & Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Peak Season:</span>
            <div className="text-lg font-bold text-gbu-blue">
              ₹{rentRate.peak.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Off-Peak:</span>
            <div className="text-lg font-bold text-green-600">
              ₹{rentRate.offPeak.toLocaleString()}
            </div>
          </div>
        </div>

        {(rentRate.halfDay || rentRate.fullDay) && (
          <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
            {rentRate.halfDay && (
              <div>
                <span className="font-medium text-gray-700">Half Day:</span>
                <div className="text-md font-bold text-purple-600">
                  ₹{rentRate.halfDay.toLocaleString()}
                </div>
              </div>
            )}
            {rentRate.fullDay && (
              <div>
                <span className="font-medium text-gray-700">Full Day:</span>
                <div className="text-md font-bold text-indigo-600">
                  ₹{rentRate.fullDay.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-medium text-gray-700">Your Rate ({userRole}):</span>
            <span className="font-bold text-xl text-red-600">
              ₹{getRoleBasedPrice().toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-gray-700">Capacity:</span>
            <span className="font-semibold">{capacity} {capacity > 1 ? 'seats' : 'person'}</span>
          </div>

          {roomCount && (
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">Available Rooms:</span>
              <span className="font-semibold text-green-600">{roomCount}</span>
            </div>
          )}
          
          {timeSlots && timeSlots.length > 0 && (
            <div className="mt-2">
              <span className="font-medium text-gray-700 text-sm">Available Slots:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {timeSlots.map((slot, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gbu-lightBlue text-gbu-blue px-2 py-1 rounded"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingTable;
