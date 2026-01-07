import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GeneratedEmail } from '@/types/hiring';
import { Copy, Check, RefreshCw, Edit2, Save, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface GeneratedEmailDisplayProps {
  email: GeneratedEmail;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export const GeneratedEmailDisplay: React.FC<GeneratedEmailDisplayProps> = ({
  email,
  onRegenerate,
  isRegenerating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(email.subject);
  const [editedBody, setEditedBody] = useState(email.body);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullEmail = `Subject: ${editedSubject}\n\n${editedBody}`;
    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Changes saved!');
  };

  const typeLabels = {
    offer: 'Offer Email',
    negotiation: 'Negotiation-Safe Offer',
    rejection: 'Rejection Email',
    keepWarm: 'Keep-Warm Email',
  };

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {typeLabels[email.type]}
              </h3>
              <p className="text-sm text-muted-foreground">
                Review and customize before sending
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <Button variant="success" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="w-4 h-4 mr-2 text-success" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={isRegenerating}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          {isEditing ? (
            <Input
              id="subject"
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
            />
          ) : (
            <div className="p-3 bg-muted rounded-lg text-foreground">
              {editedSubject}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Email Body</Label>
          {isEditing ? (
            <Textarea
              id="body"
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          ) : (
            <div className="p-4 bg-muted rounded-lg text-foreground whitespace-pre-wrap font-mono text-sm min-h-[300px]">
              {editedBody}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratedEmailDisplay;