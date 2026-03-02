# Story 2.2: Verse Database & Data Layer

Status: done

## Story

As a developer,
I want a local verse database with randomization logic,
So that users receive non-repeating relevant verses for each emotion.

## Acceptance Criteria

1. **Given** `assets/data/verses.json` contains the verse database
   **When** `getVersesForEmotion(emotion)` is called from `lib/verses.ts`
   **Then** it returns an array of `Verse` objects filtered by the given emotion

2. **And** `shuffleVerses(verses)` is a pure function in `lib/verses.ts` implementing Fisher-Yates algorithm

3. **And** session-level state (shuffled array, current index) is managed by the screen component via `useRef`, not by the data layer

4. **And** reset occurs on emotion change; re-shuffle when all verses for an emotion are exhausted

5. **And** each emotion has a minimum of 3 placeholder verses (production: 15-20 per emotion)

6. **And** each verse entry contains: id, emotion, verse, reference, explanation

7. **And** `verses.json` contains placeholder data for development; production content is provided separately

8. **And** FR7, FR8, FR18, FR19 are satisfied

## Implementation Notes

This story was **fully implemented during Story 1.1** as part of the project scaffolding:

- `lib/verses.ts` — `getVersesForEmotion()` and `shuffleVerses()` (Fisher-Yates, pure function)
- `lib/types.ts` — `Verse`, `EmotionKey` types
- `assets/data/verses.json` — 18 placeholder verses (3 per emotion), real Bible verses
- `lib/storage.ts` — AsyncStorage helpers for onboarding flag

Session-level state management (useRef for shuffled array + current index) will be implemented in Story 2.3 (Verse Display Screen) as specified in AC #3.

## Dev Agent Record

### Completion Notes List

- All data layer code implemented in Story 1.1
- Verified: 18 verses, 3 per emotion, all fields present
- Fisher-Yates shuffle tested and working
- Pure function — no side effects, returns new array

### Change Log

| Change | Date | Reason |
|---|---|---|
| Story created and marked done | 2026-03-02 | Implemented during Story 1.1 scaffolding |
