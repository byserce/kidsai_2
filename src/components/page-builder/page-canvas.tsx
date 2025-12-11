'use client';

import type { ContentBlock } from '@/lib/types';
import { BlockRenderer } from './block-renderer';
import { BlockControls } from './block-controls';
import { EmptyCanvas } from './empty-canvas';

interface PageCanvasProps {
  blocks: ContentBlock[];
  isPreview: boolean;
  onUpdateBlock: (id: string, content: Partial<ContentBlock['content']>) => void;
  onRemoveBlock: (id: string) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
}

export function PageCanvas({ blocks, isPreview, onUpdateBlock, onRemoveBlock, onMoveBlock }: PageCanvasProps) {
  if (blocks.length === 0 && !isPreview) {
    return <EmptyCanvas />;
  }

  return (
    <div className="p-4 md:p-10">
      <div className="mx-auto max-w-3xl">
        <div className={isPreview ? 'space-y-8' : 'space-y-2'}>
          {blocks.map((block, index) => (
            <div key={block.id} className="group/block relative rounded-lg">
              {!isPreview && (
                <BlockControls
                  blockId={block.id}
                  blockType={block.type}
                  onMove={onMoveBlock}
                  onRemove={onRemoveBlock}
                  isFirst={index === 0}
                  isLast={index === blocks.length - 1}
                  onUpdate={(content) => onUpdateBlock(block.id, content)}
                />
              )}
              <BlockRenderer
                block={block}
                isPreview={isPreview}
                onUpdate={(content) => onUpdateBlock(block.id, content)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
