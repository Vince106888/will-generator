import { PromptType } from "./promptRegistry";

export type AiProviderResult<TOutput> = {
  modelIdentifier: string;
  providerIdentifier: string;
  promptType: PromptType;
  promptVersion: string;
  output: TOutput | null;
  confidence: number;
  abstained: boolean;
  uncertainty?: string;
};

export interface AiProvider {
  extract(input: { freeText: string; context?: Record<string, unknown> }): Promise<AiProviderResult<unknown>>;
  explain(input: { topic: string; context?: string }): Promise<AiProviderResult<unknown>>;
  summarize(input: { freeText: string }): Promise<AiProviderResult<unknown>>;
}