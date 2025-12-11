'use client';

import type { ContentBlock } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

interface CtaBlockProps {
  block: ContentBlock;
  isPreview: boolean;
  onUpdate: (content: Partial<ContentBlock['content']>) => void;
}

export function CtaBlock({ block, isPreview, onUpdate }: CtaBlockProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);

  const handleTextBlur = () => {
    const newText = textRef.current?.innerText;
    if (newText !== block.content.text) {
      onUpdate({ text: newText });
    }
  };

  const handleButtonBlur = () => {
    const newButtonText = buttonRef.current?.innerText;
    if (newButtonText !== block.content.buttonText) {
      onUpdate({ buttonText: newButtonText });
    }
  };

  const editableClasses = 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-sm px-1 -mx-1';

  return (
    <div className="flex flex-col items-center gap-6 rounded-lg border bg-card p-8 text-center shadow-sm">
      <p
        ref={textRef}
        className={cn('text-xl text-card-foreground', !isPreview && editableClasses)}
        contentEditable={!isPreview}
        suppressContentEditableWarning
        onBlur={handleTextBlur}
      >
        {block.content.text || 'Call to action text'}
      </p>
      <Button asChild size="lg">
        <a href={block.content.buttonUrl || '#'}>
          <span
            ref={buttonRef}
            className={cn(!isPreview && editableClasses)}
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={handleButtonBlur}
          >
            {block.content.buttonText || 'Click Here'}
          </span>
        </a>
      </Button>
    </div>
  );
}
