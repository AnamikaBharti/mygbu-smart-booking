
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ZoomIn } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  facilityName: string;
  autoPlay?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  facilityName, 
  autoPlay = true 
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!autoPlay || isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, isHovered, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-0 relative">
                  <img 
                    src={image} 
                    alt={`${facilityName} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <img 
                        src={image} 
                        alt={`${facilityName} - Image ${index + 1}`}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      
      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-gbu-blue' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
