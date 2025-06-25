
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  bookedDates: string[];
  pendingDates: string[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onDateSelect,
  bookedDates,
  pendingDates
}) => {
  const today = startOfDay(new Date());

  const isDateBooked = (date: Date) => {
    return bookedDates.includes(format(date, 'yyyy-MM-dd'));
  };

  const isDatePending = (date: Date) => {
    return pendingDates.includes(format(date, 'yyyy-MM-dd'));
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isDateBooked(date);
  };

  const modifiers = {
    booked: (date: Date) => isDateBooked(date),
    pending: (date: Date) => isDatePending(date),
    available: (date: Date) => !isDateBooked(date) && !isDatePending(date) && isAfter(date, today)
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    pending: {
      backgroundColor: '#eab308',
      color: 'white'
    },
    available: {
      backgroundColor: '#10b981',
      color: 'white'
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gbu-blue">Select Date</CardTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Pending</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={isDateDisabled}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-md border pointer-events-auto"
        />
        {selectedDate && (
          <div className="mt-4 p-3 bg-gbu-lightBlue rounded-lg">
            <p className="text-sm font-medium text-gbu-blue">
              Selected Date: {format(selectedDate, 'PPPP')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
