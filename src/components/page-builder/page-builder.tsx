'use client';

import React, { useState, useCallback } from 'react';
import type { ContentBlock, BlockType } from '@/lib/types';
import { initialBlocks } from '@/lib/initial-blocks';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { BuilderSidebar } from '@/components/page-builder/builder-sidebar';
import { BuilderHeader } from '@/components/page-builder/builder-header';
import { PageCanvas } from '@/components/page-builder/page-canvas';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PageBuilder() {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks);
  const [isPreview, setIsPreview] = useState(false);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: ContentBlock = {
      id: new Date().getTime().toString(),
      type,
      content: {},
    };

    switch (type) {
      case 'headline':
        newBlock.content = { text: 'New Headline', level: 2 };
        break;
      case 'paragraph':
        newBlock.content = { text: 'New paragraph. Start typing here...' };
        break;
      case 'image':
        newBlock.content = {
          imageUrl: PlaceHolderImages[0]?.imageUrl || 'https://picsum.photos/seed/default/1200/800',
          altText: PlaceHolderImages[0]?.description || 'Placeholder image',
        };
        break;
      case 'cta':
        newBlock.content = {
          text: 'New Call to Action',
          buttonText: 'Click me',
          buttonUrl: '#',
        };
        break;
    }

    setBlocks((prev) => [...prev, newBlock]);
  }, []);

  const updateBlock = useCallback((id: string, newContent: Partial<ContentBlock['content']>) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, content: { ...block.content, ...newContent } } : block
      )
    );
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  }, []);

  const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newBlocks = [...prev];
      const [movedBlock] = newBlocks.splice(index, 1);
      newBlocks.splice(newIndex, 0, movedBlock);

      return newBlocks;
    });
  }, []);

  return (
    <SidebarProvider>
      <BuilderSidebar onAddBlock={addBlock} />
      <SidebarInset className="flex flex-col !m-0 !rounded-none !shadow-none">
        <BuilderHeader
          isPreview={isPreview}
          onPreviewToggle={() => setIsPreview(!isPreview)}
        />
        <div className="flex-1 overflow-y-auto bg-white dark:bg-card">
          <PageCanvas
            blocks={blocks}
            isPreview={isPreview}
            onUpdateBlock={updateBlock}
            onRemoveBlock={removeBlock}
            onMoveBlock={moveBlock}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
