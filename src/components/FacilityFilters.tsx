
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FacilityFiltersProps {
  onFilterChange: (filters: any) => void;
}

const FacilityFilters: React.FC<FacilityFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    type: 'all',
    capacity: 'all',
    priceRange: 'all',
    season: 'peak'
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const facilityTypes = [
    { value: 'all', label: 'All Facilities' },
    { value: 'auditorium', label: 'Auditoriums' },
    { value: 'conference', label: 'Conference Rooms' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'sports', label: 'Sports Facilities' },
    { value: 'dining', label: 'Kitchen & Dining' },
  ];

  const capacityRanges = [
    { value: 'all', label: 'Any Capacity' },
    { value: '50', label: '50+ people' },
    { value: '100', label: '100+ people' },
    { value: '200', label: '200+ people' },
    { value: '300', label: '300+ people' },
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-5000', label: '₹0 - ₹5,000' },
    { value: '5000-10000', label: '₹5,000 - ₹10,000' },
    { value: '10000-15000', label: '₹10,000 - ₹15,000' },
    { value: '15000+', label: '₹15,000+' },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-gbu-blue">Filter Facilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Facility Type</label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {facilityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Capacity</label>
            <Select value={filters.capacity} onValueChange={(value) => handleFilterChange('capacity', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {capacityRanges.map((capacity) => (
                  <SelectItem key={capacity.value} value={capacity.value}>
                    {capacity.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Season</label>
            <Select value={filters.season} onValueChange={(value) => handleFilterChange('season', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peak">Peak Season</SelectItem>
                <SelectItem value="offpeak">Off-Peak Season</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">
            Type: {facilityTypes.find(t => t.value === filters.type)?.label}
          </Badge>
          <Badge variant="outline">
            Capacity: {capacityRanges.find(c => c.value === filters.capacity)?.label}
          </Badge>
          <Badge variant="outline">
            Price: {priceRanges.find(p => p.value === filters.priceRange)?.label}
          </Badge>
          <Badge variant="outline">
            Season: {filters.season === 'peak' ? 'Peak' : 'Off-Peak'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilityFilters;
