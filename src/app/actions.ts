'use server';

import {
  generateContentSuggestions,
  type GenerateContentSuggestionsInput,
} from '@/ai/flows/generate-content-suggestions';
import { z } from 'zod';

const resultSchema = z.object({
  suggestions: z.array(z.string()).optional(),
  error: z.string().optional(),
});

export async function getSuggestions(
  input: GenerateContentSuggestionsInput
): Promise<z.infer<typeof resultSchema>> {
  try {
    const output = await generateContentSuggestions(input);
    if (!output?.suggestions || output.suggestions.length === 0) {
      return {
        error: "The AI model didn't return any suggestions. Please try refining your topic or keywords.",
      };
    }
    return { suggestions: output.suggestions };
  } catch (e) {
    console.error('Error generating suggestions:', e);
    return {
      error: 'An unexpected error occurred while generating suggestions.',
    };
  }
}
