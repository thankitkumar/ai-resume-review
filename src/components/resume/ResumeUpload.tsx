import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResumeUploadProps {
  onTextExtracted: (text: string) => void;
  isLoading?: boolean;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ 
  onTextExtracted, 
  isLoading = false 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    
    // For demo, read as text (in production, you'd parse PDF/DOCX)
    const text = await file.text();
    setResumeText(text);
    onTextExtracted(text);
  };

  const handlePasteSubmit = () => {
    if (resumeText.trim()) {
      onTextExtracted(resumeText);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setResumeText('');
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Upload Resume</h3>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setInputMode('upload')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
              inputMode === 'upload' 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Upload
          </button>
          <button
            onClick={() => setInputMode('paste')}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
              inputMode === 'paste' 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Paste Text
          </button>
        </div>
      </div>

      {inputMode === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-muted/50",
            fileName && "border-success bg-success/5"
          )}
        >
          {fileName ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{fileName}</p>
                <p className="text-sm text-muted-foreground">File uploaded successfully</p>
              </div>
              <button 
                onClick={clearFile}
                className="ml-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isLoading}
              />
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">
                Drop your resume here, or <span className="text-primary">browse</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Supports PDF, DOC, DOCX, TXT (Max 5MB)
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste the resume text here..."
            className="w-full h-48 p-4 bg-muted rounded-xl border-0 resize-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={isLoading}
          />
          <Button 
            onClick={handlePasteSubmit}
            disabled={!resumeText.trim() || isLoading}
            className="w-full"
            variant="gradient"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Resume'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
