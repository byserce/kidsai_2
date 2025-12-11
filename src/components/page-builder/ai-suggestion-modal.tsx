'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSuggestions } from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, WandSparkles, Quote } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardDescription } from '@/components/ui/card';
import type { BlockType } from '@/lib/types';

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  keywords: z.string().min(3, 'Keywords must be at least 3 characters long.'),
});

interface AiSuggestionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  blockType: BlockType;
  onSelectSuggestion: (suggestion: string) => void;
}

export function AiSuggestionModal({ open, setOpen, blockType, onSelectSuggestion }: AiSuggestionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: '', keywords: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions([]);
    const result = await getSuggestions({ blockType, ...values });
    setIsLoading(false);

    if (result.error) {
      toast({ variant: 'destructive', title: 'Generation Failed', description: result.error });
    } else if (result.suggestions) {
      setSuggestions(result.suggestions);
    }
  }
  
  const resetAndClose = () => {
    setOpen(false);
    form.reset();
    setSuggestions([]);
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <WandSparkles className="text-accent" />
            AI Content Assistant
          </DialogTitle>
          <DialogDescription>
            Provide a topic and keywords to generate content suggestions for your '{blockType}' block.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer sale" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., discounts, fashion, new arrivals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Generate Suggestions'}
            </Button>
          </form>
        </Form>

        {suggestions.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-foreground">Suggestions</h3>
            <ScrollArea className="h-48">
              <div className="space-y-2 pr-4">
                {suggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => onSelectSuggestion(suggestion)}
                  >
                    <CardDescription className="flex items-start gap-3 p-3 text-sm">
                      <Quote className="h-4 w-4 shrink-0 mt-1" />
                      <span>{suggestion}</span>
                    </CardDescription>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <DialogFooter>
            <Button variant="outline" onClick={resetAndClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
