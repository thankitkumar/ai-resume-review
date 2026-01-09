import React, { useState } from 'react';
import { Message } from '@/types/ats';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Mail, 
  Send,
  Inbox,
  PenSquare,
  Check,
  Clock,
  Sparkles,
  Loader2
} from 'lucide-react';

interface MessagesViewProps {
  messages: Message[];
  onSendMessage: (candidateId: string, subject: string, body: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  messages,
  onSendMessage,
}) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const unreadCount = messages.filter(m => !m.read && m.direction === 'inbound').length;

  const handleGenerateEmail = async (type: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates: Record<string, { subject: string; body: string }> = {
      interview: {
        subject: 'Interview Invitation - [Position Name]',
        body: `Dear [Candidate Name],

Thank you for your application. We were impressed by your background and would like to invite you for an interview.

Interview Details:
- Date: [Date]
- Time: [Time]
- Format: [Video/In-person]
- Duration: Approximately 45 minutes

Please confirm your availability at your earliest convenience.

Best regards,
[Your Name]
Hiring Team`,
      },
      rejection: {
        subject: 'Update on Your Application',
        body: `Dear [Candidate Name],

Thank you for taking the time to apply for the [Position] role at our company.

After careful consideration, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.

We appreciate your interest and encourage you to apply for future positions that match your qualifications.

Best wishes,
[Your Name]
Hiring Team`,
      },
      followup: {
        subject: 'Following Up on Your Application',
        body: `Dear [Candidate Name],

I hope this message finds you well. I wanted to follow up on your recent application for [Position].

We are still in the process of reviewing applications and will be in touch soon with next steps.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
[Your Name]
Hiring Team`,
      },
    };

    const template = templates[type] || templates.interview;
    setComposeData(prev => ({
      ...prev,
      subject: template.subject,
      body: template.body,
    }));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread messages` : 'All caught up'}
          </p>
        </div>
        <Button onClick={() => setIsComposing(true)} className="gap-2">
          <PenSquare className="w-4 h-4" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>
          
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  setIsComposing(false);
                }}
                className={cn(
                  "p-4 cursor-pointer transition-colors",
                  selectedMessage?.id === message.id ? "bg-primary/5" : "hover:bg-muted/50",
                  !message.read && message.direction === 'inbound' && "bg-info/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                    {message.candidateName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={cn(
                        "font-medium text-foreground truncate",
                        !message.read && message.direction === 'inbound' && "font-semibold"
                      )}>
                        {message.candidateName}
                      </p>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground truncate">{message.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{message.body.slice(0, 50)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail / Compose */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-card overflow-hidden">
          {isComposing ? (
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">New Message</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">To</label>
                  <Input
                    placeholder="Candidate email..."
                    value={composeData.to}
                    onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject</label>
                  <Input
                    placeholder="Email subject..."
                    value={composeData.subject}
                    onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Message</label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">AI Templates:</span>
                      {['interview', 'rejection', 'followup'].map((type) => (
                        <Button
                          key={type}
                          variant="outline"
                          size="sm"
                          onClick={() => handleGenerateEmail(type)}
                          disabled={isGenerating}
                          className="gap-1 capitalize"
                        >
                          {isGenerating ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Sparkles className="w-3 h-3" />
                          )}
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Textarea
                    placeholder="Write your message..."
                    value={composeData.body}
                    onChange={(e) => setComposeData(prev => ({ ...prev, body: e.target.value }))}
                    className="min-h-[250px]"
                  />
                </div>
                
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsComposing(false)}>
                    Cancel
                  </Button>
                  <Button className="gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          ) : selectedMessage ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                    {selectedMessage.candidateName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{selectedMessage.candidateName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMessage.direction === 'inbound' ? 'Received' : 'Sent'} on{' '}
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Reply
                </Button>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{selectedMessage.subject}</h3>
                <p className="text-foreground whitespace-pre-wrap">{selectedMessage.body}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
              <Inbox className="w-12 h-12 mb-4" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
