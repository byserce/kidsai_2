import type { ContentBlock } from './types';
import { PlaceHolderImages } from './placeholder-images';

const imagePlaceholder = PlaceHolderImages[0];

export const initialBlocks: ContentBlock[] = [
  {
    id: '1',
    type: 'headline',
    content: {
      text: 'Welcome to NestableWeb',
      level: 1,
    },
  },
  {
    id: '2',
    type: 'paragraph',
    content: {
      text: 'This is your canvas. Start building your beautiful website by adding, arranging, and editing content blocks. Use the sidebar on the left to add new blocks to your page.',
    },
  },
  {
    id: '3',
    type: 'image',
    content: {
      imageUrl: imagePlaceholder.imageUrl,
      altText: imagePlaceholder.description,
    },
  },
  {
    id: '6',
    type: 'cta',
    content: {
      text: "Ready to get started? Let's build something amazing together.",
      buttonText: 'Explore Features',
      buttonUrl: '#',
    },
  },
];
