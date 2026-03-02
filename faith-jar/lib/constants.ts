import { EmotionKey, EmotionConfig } from './types';

export const EMOTIONS: Record<EmotionKey, EmotionConfig> = {
  anxiety: { label: 'Anxiety', color: '#7EB8D8', icon: 'cloud' },
  sadness: { label: 'Sadness', color: '#A8B5C8', icon: 'sad-face' },
  joy: { label: 'Joy', color: '#F2D07A', icon: 'smiley' },
  loneliness: { label: 'Loneliness', color: '#C4A8D8', icon: 'people' },
  anger: { label: 'Anger', color: '#E8A87C', icon: 'flame' },
  gratitude: { label: 'Gratitude', color: '#A8D8B8', icon: 'heart' },
};

export const COLORS = {
  background: '#faf7f2',
  text: '#2d2a26',
  accent: '#c4956a',
  explanationText: '#8b7d6b',
};

export const TYPOGRAPHY = {
  verseFont: 'Lora_400Regular',
  verseFontBold: 'Lora_700Bold',
  bodyFont: 'Inter_400Regular',
  bodyFontMedium: 'Inter_500Medium',
  bodyFontBold: 'Inter_700Bold',
};
