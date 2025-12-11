'use client';

import type { ContentBlock } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

interface ParagraphBlockProps {
  block: ContentBlock;
  isPreview: boolean;
  onUpdate: (content: Partial<ContentBlock['content']>) => void;
}

export function ParagraphBlock({ block, isPreview, onUpdate }: ParagraphBlockProps) {
  const editableRef = useRef<HTMLParagraphElement>(null);

  const handleBlur = () => {
    const newText = editableRef.current?.innerHTML;
    if (newText !== block.content.text) {
      onUpdate({ text: newText });
    }
  };

  return (
    <p
      ref={editableRef}
      className={cn(
        'text-base leading-relaxed text-foreground/80',
        !isPreview &&
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-md p-2 -m-2'
      )}
      contentEditable={!isPreview}
      suppressContentEditableWarning
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: block.content.text || '' }}
    />
  );
}
