'use client';

import type { ContentBlock } from '@/lib/types';
import { HeadlineBlock } from './blocks/headline-block';
import { ParagraphBlock } from './blocks/paragraph-block';
import { ImageBlock } from './blocks/image-block';
import { CtaBlock } from './blocks/cta-block';

interface BlockRendererProps {
  block: ContentBlock;
  isPreview: boolean;
  onUpdate: (content: Partial<ContentBlock['content']>) => void;
}

export function BlockRenderer({ block, isPreview, onUpdate }: BlockRendererProps) {
  const props = { block, isPreview, onUpdate };
  switch (block.type) {
    case 'headline':
      return <HeadlineBlock {...props} />;
    case 'paragraph':
      return <ParagraphBlock {...props} />;
    case 'image':
      return <ImageBlock {...props} />;
    case 'cta':
      return <CtaBlock {...props} />;
    default:
      return (
        <div className="border-2 border-dashed border-destructive bg-destructive/10 p-4 text-center text-destructive">
          Unknown block type: {block.type}
        </div>
      );
  }
}
