export type BlockType = 'headline' | 'paragraph' | 'image' | 'cta';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: {
    text?: string;
    level?: 1 | 2 | 3;
    imageUrl?: string;
    altText?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
}
