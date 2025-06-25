
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookingForm as BookingFormType, Facility } from '@/types/facility';
import { format } from 'date-fns';

interface BookingFormProps {
  facility: Facility;
  selectedDate: Date;
  onSubmit: (booking: BookingFormType) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  facility,
  selectedDate,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<Partial<BookingFormType>>({
    facilityId: facility.id,
    date: format(selectedDate, 'yyyy-MM-dd'),
    startTime: '',
    endTime: '',
    purpose: '',
    organizingDept: '',
    contactEmail: '',
    contactMobile: ''
  });

  const [totalCost, setTotalCost] = React.useState(0);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const calculateCost = (start: string, end: string) => {
    if (!start || !end) return 0;
    
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    const duration = endHour - startHour;
    
    if (duration <= 0) return 0;
    
    // Simple calculation: base rate per hour (assuming off-peak for now)
    const hourlyRate = facility.rentRate.offPeak / 8; // 8-hour base
    const baseCost = hourlyRate * duration;
    const cleaningCharge = 500;
    const securityDeposit = 2000;
    
    return baseCost + cleaningCharge + securityDeposit;
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    if (field === 'startTime' || field === 'endTime') {
      const cost = calculateCost(
        field === 'startTime' ? value : formData.startTime || '',
        field === 'endTime' ? value : formData.endTime || ''
      );
      setTotalCost(cost);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.startTime && formData.endTime && formData.purpose && 
        formData.organizingDept && formData.contactEmail && formData.contactMobile) {
      onSubmit(formData as BookingFormType);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gbu-blue">Book {facility.name}</CardTitle>
        <p className="text-sm text-gray-600">
          Date: {format(selectedDate, 'PPPP')}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Select 
                value={formData.startTime} 
                onValueChange={(value) => handleInputChange('startTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Select 
                value={formData.endTime} 
                onValueChange={(value) => handleInputChange('endTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose of Event</Label>
            <Textarea
              id="purpose"
              placeholder="Describe the purpose of your event..."
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="organizingDept">Organizing Department/Person</Label>
            <Input
              id="organizingDept"
              placeholder="Department or person organizing the event"
              value={formData.organizingDept}
              onChange={(e) => handleInputChange('organizingDept', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contact@gbu.ac.in"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="contactMobile">Contact Mobile</Label>
              <Input
                id="contactMobile"
                type="tel"
                placeholder="+91 12345 67890"
                value={formData.contactMobile}
                onChange={(e) => handleInputChange('contactMobile', e.target.value)}
              />
            </div>
          </div>

          {totalCost > 0 && (
            <div className="p-4 bg-gbu-lightBlue rounded-lg">
              <h4 className="font-semibold text-gbu-blue mb-2">Cost Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Facility Rent:</span>
                  <span>₹{(totalCost - 2500).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning Charge:</span>
                  <span>₹500</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span>₹2,000</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-gbu-blue">
                  <span>Total Amount:</span>
                  <span>₹{totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gbu-blue hover:bg-gbu-darkBlue"
              disabled={!formData.startTime || !formData.endTime || !formData.purpose}
            >
              Submit Booking Request
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
