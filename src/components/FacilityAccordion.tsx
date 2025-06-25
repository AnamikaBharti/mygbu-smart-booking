
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FacilityAccordionProps {
  bookingGuidelines: string[];
  termsConditions: string[];
  cancellationPolicy: string[];
}

const FacilityAccordion: React.FC<FacilityAccordionProps> = ({
  bookingGuidelines,
  termsConditions,
  cancellationPolicy
}) => {
  const formatText = (items: string[]) => {
    return items.map((item, index) => (
      <li key={index} className="mb-2 text-sm text-gray-700">
        {item}
      </li>
    ));
  };

  return (
    <Accordion type="single" collapsible className="w-full mt-4">
      <AccordionItem value="guidelines">
        <AccordionTrigger className="text-gbu-blue font-medium">
          Booking Guidelines
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-1">
            {formatText(bookingGuidelines)}
          </ul>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="terms">
        <AccordionTrigger className="text-gbu-blue font-medium">
          Terms & Conditions
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-1">
            {formatText(termsConditions)}
          </ul>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="cancellation">
        <AccordionTrigger className="text-gbu-blue font-medium">
          Cancellation Policy
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-1">
            {formatText(cancellationPolicy)}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FacilityAccordion;
