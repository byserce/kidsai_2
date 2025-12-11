'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, GripVertical, Trash2, WandSparkles } from 'lucide-react';
import { AiSuggestionModal } from './ai-suggestion-modal';
import type { BlockType, ContentBlock } from '@/lib/types';

interface BlockControlsProps {
  blockId: string;
  blockType: BlockType;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onRemove: (id: string) => void;
  onUpdate: (content: Partial<ContentBlock['content']>) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function BlockControls({ blockId, blockType, onMove, onRemove, onUpdate, isFirst, isLast }: BlockControlsProps) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <>
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity duration-200">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(blockId, 'up')} disabled={isFirst} aria-label="Move block up">
          <ArrowUp className="h-4 w-4" />
        </Button>
        <div className="cursor-grab text-muted-foreground self-center" aria-label="Move block">
          <GripVertical className="h-4 w-4"/>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onMove(blockId, 'down')} disabled={isLast} aria-label="Move block down">
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity duration-200">
        {blockType !== 'image' && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsAiModalOpen(true)} aria-label="Get AI suggestions">
            <WandSparkles className="h-4 w-4 text-accent" />
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemove(blockId)} aria-label="Remove block">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <AiSuggestionModal
        open={isAiModalOpen}
        setOpen={setIsAiModalOpen}
        blockType={blockType}
        onSelectSuggestion={(suggestion) => {
          onUpdate({ text: suggestion });
          setIsAiModalOpen(false);
        }}
      />
    </>
  );
}
