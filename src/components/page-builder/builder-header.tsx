'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface BuilderHeaderProps {
  isPreview: boolean;
  onPreviewToggle: () => void;
}

export function BuilderHeader({ isPreview, onPreviewToggle }: BuilderHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <Label htmlFor="preview-mode" className="flex items-center gap-2 cursor-pointer text-sm font-medium">
          {isPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>Preview Mode</span>
        </Label>
        <Switch
          id="preview-mode"
          checked={isPreview}
          onCheckedChange={onPreviewToggle}
          aria-label="Toggle preview mode"
        />
      </div>
    </header>
  );
}
