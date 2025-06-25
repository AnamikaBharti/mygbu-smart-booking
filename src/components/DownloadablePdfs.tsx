
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadablePdfsProps {
  pdfs?: {
    rateChart?: string;
    bookingRules?: string;
    termsConditions?: string;
  };
}

const DownloadablePdfs: React.FC<DownloadablePdfsProps> = ({ pdfs }) => {
  if (!pdfs) return null;

  const handleDownload = (url: string, filename: string) => {
    // In a real implementation, this would download the actual PDF
    console.log(`Downloading ${filename} from ${url}`);
    // For demo purposes, we'll show a toast
    alert(`Downloading ${filename}...`);
  };

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-medium text-gbu-blue mb-2">Download Documents</h4>
      <div className="flex flex-wrap gap-2">
        {pdfs.rateChart && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(pdfs.rateChart!, 'Rate Chart')}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Rate Chart
          </Button>
        )}
        {pdfs.bookingRules && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(pdfs.bookingRules!, 'Booking Rules')}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Booking Rules
          </Button>
        )}
        {pdfs.termsConditions && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownload(pdfs.termsConditions!, 'Terms & Conditions')}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Terms & Conditions
          </Button>
        )}
      </div>
    </div>
  );
};

export default DownloadablePdfs;
