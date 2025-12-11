'use client';

import type { ContentBlock } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

interface HeadlineBlockProps {
  block: ContentBlock;
  isPreview: boolean;
  onUpdate: (content: Partial<ContentBlock['content']>) => void;
}

export function HeadlineBlock({ block, isPreview, onUpdate }: HeadlineBlockProps) {
  const level = block.content.level || 1;
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const editableRef = useRef<HTMLHeadingElement>(null);

  const handleBlur = () => {
    const newText = editableRef.current?.innerText;
    if (newText !== block.content.text) {
      onUpdate({ text: newText });
    }
  };

  const className = cn(
    'font-headline font-bold tracking-tight text-foreground',
    {
      'text-4xl md:text-5xl': level === 1,
      'text-3xl md:text-4xl': level === 2,
      'text-2xl md:text-3xl': level === 3,
    },
    !isPreview &&
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-md p-2 -m-2'
  );

  return (
    <Tag
      ref={editableRef}
      className={className}
      contentEditable={!isPreview}
      suppressContentEditableWarning
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: block.content.text || '' }}
    />
  );
}
