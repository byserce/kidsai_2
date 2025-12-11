'use server';

/**
 * @fileOverview AI tool to suggest relevant copy for content blocks.
 *
 * - generateContentSuggestions - A function that generates content suggestions for a given content block.
 * - GenerateContentSuggestionsInput - The input type for the generateContentSuggestions function.
 * - GenerateContentSuggestionsOutput - The return type for the generateContentSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentSuggestionsInputSchema = z.object({
  blockType: z
    .string()
    .describe('The type of content block, e.g., headline, paragraph, call to action.'),
  topic: z.string().describe('The main topic or subject of the content block.'),
  keywords: z
    .string()
    .describe('Comma-separated keywords related to the content block.'),
});
export type GenerateContentSuggestionsInput = z.infer<
  typeof GenerateContentSuggestionsInputSchema
>;

const GenerateContentSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of content suggestions for the content block.'),
});
export type GenerateContentSuggestionsOutput = z.infer<
  typeof GenerateContentSuggestionsOutputSchema
>;

export async function generateContentSuggestions(
  input: GenerateContentSuggestionsInput
): Promise<GenerateContentSuggestionsOutput> {
  return generateContentSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentSuggestionsPrompt',
  input: {schema: GenerateContentSuggestionsInputSchema},
  output: {schema: GenerateContentSuggestionsOutputSchema},
  prompt: `You are an AI assistant that helps generate content suggestions for web page content blocks.

  Given the following information about the content block, generate 3 different content suggestions:

  Block Type: {{{blockType}}}
  Topic: {{{topic}}}
  Keywords: {{{keywords}}}

  Suggestions:
  `,
});

const generateContentSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateContentSuggestionsFlow',
    inputSchema: GenerateContentSuggestionsInputSchema,
    outputSchema: GenerateContentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
