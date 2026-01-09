import React, { useState } from 'react';
import { PUBLISH_PLATFORMS, PublishPlatform, PublishPlatformStatus } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { 
  Building2, 
  Linkedin, 
  Globe, 
  Link, 
  Loader2, 
  Check, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const platformIcons: Record<string, React.ElementType> = {
  Building2,
  Linkedin,
  Globe,
  Link,
};

interface JobPublishingPanelProps {
  jobTitle: string;
  currentPlatforms: PublishPlatformStatus[];
  onPublish: (platforms: PublishPlatform[], customUrl?: string) => void;
  isPublishing?: boolean;
}

export const JobPublishingPanel: React.FC<JobPublishingPanelProps> = ({
  jobTitle,
  currentPlatforms,
  onPublish,
  isPublishing,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PublishPlatform[]>(
    currentPlatforms.map(p => p.platform)
  );
  const [customUrl, setCustomUrl] = useState('');

  const togglePlatform = (platform: PublishPlatform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const getPlatformStatus = (platform: PublishPlatform) => {
    return currentPlatforms.find(p => p.platform === platform);
  };

  const handlePublish = () => {
    const newPlatforms = selectedPlatforms.filter(
      p => !currentPlatforms.some(cp => cp.platform === p && cp.status === 'published')
    );
    onPublish(newPlatforms, customUrl || undefined);
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-2">Publish Job</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Select platforms to publish "{jobTitle}"
      </p>

      <div className="space-y-3 mb-6">
        {PUBLISH_PLATFORMS.map((platform) => {
          const Icon = platformIcons[platform.icon] || Globe;
          const status = getPlatformStatus(platform.value);
          const isPublished = status?.status === 'published';
          const isFailed = status?.status === 'failed';

          return (
            <div
              key={platform.value}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all",
                selectedPlatforms.includes(platform.value)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Checkbox
                checked={selectedPlatforms.includes(platform.value)}
                onCheckedChange={() => togglePlatform(platform.value)}
                disabled={isPublished}
              />
              
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-foreground">{platform.label}</p>
                {isPublished && status?.url && (
                  <a
                    href={status.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View listing
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {isFailed && (
                  <p className="text-sm text-destructive">{status?.error || 'Publishing failed'}</p>
                )}
              </div>
              
              {isPublished && (
                <span className="flex items-center gap-1 text-sm text-success">
                  <Check className="w-4 h-4" />
                  Published
                </span>
              )}
              {isFailed && (
                <span className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  Failed
                </span>
              )}
            </div>
          );
        })}
      </div>

      {selectedPlatforms.includes('custom') && (
        <div className="mb-6 space-y-2">
          <Label htmlFor="customUrl">Custom Job Board URL</Label>
          <Input
            id="customUrl"
            placeholder="https://your-job-board.com/post"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
          />
        </div>
      )}

      <Button
        onClick={handlePublish}
        disabled={selectedPlatforms.length === 0 || isPublishing}
        className="w-full gap-2"
      >
        {isPublishing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Globe className="w-4 h-4" />
            Publish to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''}
          </>
        )}
      </Button>
    </div>
  );
};

export default JobPublishingPanel;
