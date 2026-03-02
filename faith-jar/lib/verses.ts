import { Verse, EmotionKey } from './types';
import versesData from '../assets/data/verses.json';

export function getVersesForEmotion(emotion: EmotionKey): Verse[] {
  return (versesData as Verse[]).filter((v) => v.emotion === emotion);
}

export function shuffleVerses(verses: Verse[]): Verse[] {
  const shuffled = [...verses];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
