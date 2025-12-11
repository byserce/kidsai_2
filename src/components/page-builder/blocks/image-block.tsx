'use client';

import type { ContentBlock } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ImageBlockProps {
  block: ContentBlock;
  isPreview: boolean;
  onUpdate: (content: Partial<ContentBlock['content']>) => void;
}

export function ImageBlock({ block, isPreview }: ImageBlockProps) {
  const imageUrl = block.content.imageUrl || PlaceHolderImages[0]?.imageUrl;
  const imageHint = PlaceHolderImages.find(p => p.imageUrl === imageUrl)?.imageHint || 'placeholder image';

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-lg',
        !isPreview && 'ring-2 ring-border ring-offset-2 ring-offset-background'
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={block.content.altText || 'Content image'}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-secondary">
          <ImageIcon className="h-16 w-16 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Image Block</p>
        </div>
      )}
    </div>
  );
}
