'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { BlockType } from '@/lib/types';
import { Heading2, Image as ImageIcon, Pilcrow, SquareArrowOutUpRight } from 'lucide-react';
import { NestableWebLogo } from '@/components/icons';

interface BuilderSidebarProps {
  onAddBlock: (type: BlockType) => void;
}

const blockOptions = [
  { type: 'headline' as BlockType, label: 'Headline', icon: Heading2 },
  { type: 'paragraph' as BlockType, label: 'Paragraph', icon: Pilcrow },
  { type: 'image' as BlockType, label: 'Image', icon: ImageIcon },
  { type: 'cta' as BlockType, label: 'Call to Action', icon: SquareArrowOutUpRight },
];

export function BuilderSidebar({ onAddBlock }: BuilderSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
            <NestableWebLogo className="size-8 text-primary" />
            <span className="text-lg font-headline font-semibold text-foreground group-data-[collapsible=icon]:hidden">NestableWeb</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blocks</SidebarGroupLabel>
          <SidebarMenu>
            {blockOptions.map(({ type, label, icon: Icon }) => (
              <SidebarMenuItem key={type}>
                <SidebarMenuButton
                  onClick={() => onAddBlock(type)}
                  className="w-full justify-start"
                  tooltip={{ children: label, side: 'right' }}
                >
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
