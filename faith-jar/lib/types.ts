export type EmotionKey = 'anxiety' | 'sadness' | 'joy' | 'loneliness' | 'anger' | 'gratitude';

export interface Verse {
  id: number;
  emotion: EmotionKey;
  verse: string;
  reference: string;
  explanation: string;
}

export interface EmotionConfig {
  label: string;
  color: string;
  icon: string;
}
