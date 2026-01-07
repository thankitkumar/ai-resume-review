import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OfferDetails } from '@/types/hiring';
import { DollarSign, MapPin, Calendar, Gift } from 'lucide-react';

interface OfferDetailsFormProps {
  data: OfferDetails;
  onChange: (data: OfferDetails) => void;
  disabled?: boolean;
}

export const OfferDetailsForm: React.FC<OfferDetailsFormProps> = ({
  data,
  onChange,
  disabled,
}) => {
  const handleChange = (field: keyof OfferDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Offer Details
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Provide compensation and logistics for the offer communication
      </p>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="roleName">Role Title</Label>
          <Input
            id="roleName"
            placeholder="e.g. Senior Software Engineer"
            value={data.roleName}
            onChange={(e) => handleChange('roleName', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salaryMin" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              Salary Min
            </Label>
            <Input
              id="salaryMin"
              placeholder="e.g. 120,000"
              value={data.salaryMin}
              onChange={(e) => handleChange('salaryMin', e.target.value)}
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryMax" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              Salary Max
            </Label>
            <Input
              id="salaryMax"
              placeholder="e.g. 150,000"
              value={data.salaryMax}
              onChange={(e) => handleChange('salaryMax', e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="e.g. San Francisco, CA (Hybrid)"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Proposed Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={data.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalBenefits" className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-muted-foreground" />
            Additional Benefits (Optional)
          </Label>
          <Textarea
            id="additionalBenefits"
            placeholder="e.g. Equity package, signing bonus, relocation assistance..."
            value={data.additionalBenefits}
            onChange={(e) => handleChange('additionalBenefits', e.target.value)}
            disabled={disabled}
            className="min-h-[80px] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsForm;