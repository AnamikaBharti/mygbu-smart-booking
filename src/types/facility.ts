export interface Facility {
  id: string;
  name: string;
  capacity: number;
  rentRate: {
    peak: number;
    offPeak: number;
    halfDay?: number;
    fullDay?: number;
    employee?: number;
    student?: number;
    outsider?: number;
  };
  description: string;
  images: string[];
  amenities: string[];
  type: 'auditorium' | 'conference' | 'seminar' | 'sports' | 'guesthouse' | 'dining' | 'accommodation';
  category?: string;
  timeSlots?: string[];
  roomCount?: number;
  inCharge?: {
    name: string;
    contact: string;
    email: string;
  };
  bookingGuidelines: string[];
  termsConditions: string[];
  cancellationPolicy: string[];
  downloadablePdfs?: {
    rateChart?: string;
    bookingRules?: string;
    termsConditions?: string;
  };
}

export interface BookingSlot {
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'pending';
}

export interface Booking {
  id: string;
  facilityId: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  organizingDept: string;
  contactEmail: string;
  contactMobile: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalLevel: number;
  totalCost: number;
  createdAt: string;
}

export interface BookingForm {
  facilityId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  organizingDept: string;
  contactEmail: string;
  contactMobile: string;
  documents?: File[];
}
