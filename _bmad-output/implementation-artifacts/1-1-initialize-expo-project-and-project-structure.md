# Story 1.1: Initialize Expo Project & Project Structure

Status: ready-for-dev

## Story

As a developer,
I want to initialize the Expo project with all dependencies and project structure,
So that the codebase is ready for feature development.

## Acceptance Criteria

1. **Given** no project exists
   **When** developer runs `npx create-expo-app@latest faith-jar --template default`
   **Then** a new Expo project is created with TypeScript configured

2. **And** all dependencies are installed:
   - `expo-superwall`
   - `react-native-reanimated`
   - `@expo-google-fonts/lora`
   - `@expo-google-fonts/inter`
   - `expo-splash-screen`
   - `@react-native-async-storage/async-storage`

3. **And** project structure exists:
   - `app/_layout.tsx`
   - `lib/types.ts`
   - `lib/constants.ts`
   - `lib/verses.ts`
   - `lib/storage.ts`
   - `assets/data/verses.json`

4. **And** TypeScript types are defined: `EmotionKey`, `Verse`, `EmotionConfig`

5. **And** `EMOTIONS` constant is populated with all 6 emotions (label, color, icon)

6. **And** `app.json` is configured with app name "Faith Jar", iOS deployment target 15.1

## Tasks / Subtasks

- [ ] Task 1: Initialize Expo project (AC: #1)
  - [ ] Run `npx create-expo-app@latest faith-jar --template default`
  - [ ] Verify TypeScript is configured (tsconfig.json exists)
  - [ ] Verify project runs with `npx expo start`

- [ ] Task 2: Install all dependencies (AC: #2)
  - [ ] Run `npx expo install expo-superwall react-native-reanimated @expo-google-fonts/lora @expo-google-fonts/inter expo-splash-screen @react-native-async-storage/async-storage`
  - [ ] Verify all packages appear in package.json dependencies
  - [ ] Verify no version conflicts in install output

- [ ] Task 3: Create project file structure (AC: #3)
  - [ ] Create `lib/` directory
  - [ ] Create `lib/types.ts` with TypeScript type definitions
  - [ ] Create `lib/constants.ts` with EMOTIONS config, COLORS, TYPOGRAPHY
  - [ ] Create `lib/verses.ts` with getVersesForEmotion() and shuffleVerses() stubs
  - [ ] Create `lib/storage.ts` with AsyncStorage helper stubs
  - [ ] Create `assets/data/` directory
  - [ ] Create `assets/data/verses.json` with placeholder data (3 verses per emotion)
  - [ ] Update `app/_layout.tsx` to basic root layout (no providers yet — that's Story 1.2)

- [ ] Task 4: Define TypeScript types (AC: #4)
  - [ ] Define `EmotionKey` union type in `lib/types.ts`
  - [ ] Define `Verse` interface in `lib/types.ts`
  - [ ] Define `EmotionConfig` interface in `lib/types.ts`

- [ ] Task 5: Populate EMOTIONS constant (AC: #5)
  - [ ] Create EMOTIONS record in `lib/constants.ts` mapping all 6 EmotionKey values
  - [ ] Define COLORS constant with app color palette
  - [ ] Define TYPOGRAPHY constant with font families and sizes

- [ ] Task 6: Configure app.json (AC: #6)
  - [ ] Set `name` and `slug` to "Faith Jar" / "faith-jar"
  - [ ] Set iOS `infoPlist.MinimumOSVersion` to "15.1"
  - [ ] Configure `expo-superwall` plugin entry (required for native modules)
  - [ ] Configure `react-native-reanimated` babel plugin

## Dev Notes

### Critical: This is Story 1 — No Prior Code Exists

This is a **greenfield project initialization**. There is no existing codebase to build on. The project directory currently contains only BMAD planning artifacts in `_bmad-output/`. All code goes inside a new `faith-jar/` subdirectory created by `create-expo-app`.

### Scope Boundaries

**IN SCOPE for this story:**
- Project initialization and dependency installation
- File structure scaffolding with stub implementations
- Type definitions and constants
- app.json configuration

**NOT in scope (handled in Story 1.2):**
- EAS Build configuration (eas.json)
- SuperwallProvider integration in _layout.tsx
- Development Build creation
- Superwall test paywall validation

**NOT in scope (handled in later epics):**
- Screen implementations (Epic 2)
- Onboarding flow (Epic 3)
- Animations (Epic 4)

### Project Structure Notes

Target file structure after this story is complete:

```
faith-jar/
├── app.json                    — Configured with Faith Jar name, iOS 15.1 target
├── package.json                — All dependencies installed
├── tsconfig.json               — TypeScript config (Expo default)
├── babel.config.js             — With reanimated plugin
├── .gitignore                  — Standard Expo gitignore
├── app/
│   ├── _layout.tsx             — Basic root layout (providers added in Story 1.2)
│   ├── index.tsx               — Default Expo welcome screen (replaced in Story 2.1)
│   └── (other Expo defaults)   — Can be cleaned up or left as-is
├── lib/
│   ├── types.ts                — EmotionKey, Verse, EmotionConfig
│   ├── constants.ts            — EMOTIONS, COLORS, TYPOGRAPHY
│   ├── verses.ts               — getVersesForEmotion(), shuffleVerses() stubs
│   └── storage.ts              — isOnboardingDone(), setOnboardingDone() stubs
└── assets/
    └── data/
        └── verses.json         — Placeholder data (3 verses per emotion = 18 entries)
```

[Source: architecture.md#Project Structure & Boundaries]

### References

- [Source: architecture.md#Starter Template Evaluation] — Expo with Expo Router selection rationale
- [Source: architecture.md#Core Architectural Decisions] — Data architecture, TypeScript patterns
- [Source: architecture.md#Implementation Patterns & Consistency Rules] — Naming conventions, file organization rules
- [Source: architecture.md#Enforcement Rules] — AI agent implementation constraints
- [Source: epics.md#Story 1.1] — Acceptance criteria and technical requirements
- [Source: epics.md#Additional Requirements] — Designer code integration context, full dependency list

## Technical Requirements

### Initialization Command

```bash
npx create-expo-app@latest faith-jar --template default
```

**Important:** As of March 2026, `create-expo-app@latest` scaffolds **Expo SDK 54** by default. This is the recommended stable version. SDK 55 (released Feb 25, 2026) is available via `--template default@sdk-55` but is very new. **Use SDK 54 (default) for stability.**

After project creation, `cd faith-jar` and install dependencies:

```bash
npx expo install expo-superwall react-native-reanimated @expo-google-fonts/lora @expo-google-fonts/inter expo-splash-screen @react-native-async-storage/async-storage
```

**Critical:** Always use `npx expo install` (not `npm install`) — it auto-resolves versions compatible with the current Expo SDK.

### Reanimated Babel Plugin

After installing `react-native-reanimated`, add the babel plugin. Update `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

**Critical:** The `react-native-reanimated/plugin` MUST be the **last plugin** in the plugins array.

### Superwall Plugin Configuration

Add `expo-superwall` to the plugins array in `app.json`:

```json
{
  "expo": {
    "plugins": [
      "expo-superwall"
    ]
  }
}
```

**Note:** The Superwall API key is NOT configured here — it's passed to `SuperwallProvider` in Story 1.2. The plugin entry is required for native module linking.

## Architecture Compliance

### Naming Conventions (MUST follow)

| Element | Convention | Example |
|---|---|---|
| Screen files | kebab-case | `verse.tsx`, `index.tsx` |
| Components | PascalCase | `EmotionCard` |
| Functions/hooks | camelCase | `getVersesForEmotion()` |
| Variables | camelCase | `selectedEmotion` |
| Config constants | UPPER_SNAKE_CASE | `EMOTIONS`, `COLORS` |
| TypeScript types | PascalCase | `Verse`, `EmotionKey` |
| JSON data fields | camelCase | `{ "id": 1, "emotion": "anxiety" }` |

[Source: architecture.md#Naming Conventions]

### Enforcement Rules (AI agents MUST)

1. Follow naming conventions — no exceptions
2. Place files ONLY in designated directories (`app/`, `lib/`, `assets/`)
3. Not create new directories without explicit approval (no `utils/`, `helpers/`, `services/`)
4. Not add state management libraries (no Redux, Zustand, Context)
5. Not add error boundary or global error handler
6. Use `react-native-reanimated` for ALL animations (later stories)
7. Not add loading spinners or skeleton screens
8. Keep each screen self-contained — no shared component library

[Source: architecture.md#Enforcement Rules]

## Library & Framework Requirements

### Package Versions (as of March 2026)

| Package | Version | Notes |
|---|---|---|
| `expo` | SDK 54 (default) | `create-expo-app@latest` creates SDK 54 |
| `expo-superwall` | 0.6.4 | Requires Expo SDK 53+, iOS 15.1+ |
| `react-native-reanimated` | ~4.1.x | `npx expo install` resolves correct version for SDK 54 |
| `@expo-google-fonts/lora` | 0.4.2 | 8 font styles (Regular, Bold, Italic, etc.) |
| `@expo-google-fonts/inter` | 0.4.2 | 18 font styles |
| `expo-splash-screen` | auto-resolved | Managed by Expo |
| `@react-native-async-storage/async-storage` | ~2.2.0 | `npx expo install` resolves SDK-compatible version |

**Critical:** Do NOT manually specify versions. `npx expo install` handles version resolution for SDK compatibility.

### expo-superwall Notes

- Official Expo SDK from Superwall (replaces deprecated `@superwall/react-native-superwall`)
- Requires **Development Build** (not Expo Go) — uses native modules
- Plugin must be registered in `app.json` plugins array
- SuperwallProvider setup deferred to Story 1.2

## File Structure Requirements

### lib/types.ts — Type Definitions

```typescript
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
```

[Source: architecture.md#TypeScript Patterns]

### lib/constants.ts — App Configuration

```typescript
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
```

**Note on icon values:** The `icon` field stores a string identifier. Actual icon components (emoji, SVG, or icon library) will be determined when designer provides frontend code in Story 2.1. Use descriptive string identifiers for now.

**Note on colors:** Emotion colors are approximate based on designer screenshots. Final values will be refined when designer code is integrated in Story 2.1. The COLORS constant values are from UX spec.

[Source: architecture.md#Frontend Architecture, ux-design-specification.md#Color palette]

### lib/verses.ts — Data Access Layer

```typescript
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
```

**Critical:** `shuffleVerses()` is a **pure function** — no side effects, no state mutation. Session state (shuffled array, current index) is managed by the screen component via `useRef` in Story 2.3. This function only returns a new shuffled copy.

[Source: architecture.md#Data Architecture, epics.md#Story 2.2]

### lib/storage.ts — AsyncStorage Helpers

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_completed';

export async function isOnboardingDone(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === 'true';
}

export async function setOnboardingDone(done: boolean): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_KEY, done ? 'true' : 'false');
}
```

**Note:** Only the onboarding flag is stored. No other data persistence needed for MVP. Screens call these helpers — never interact with AsyncStorage directly.

[Source: architecture.md#Storage Boundary]

### assets/data/verses.json — Placeholder Data

Create with **3 placeholder verses per emotion** (18 total) for development. Format:

```json
[
  {
    "id": 1,
    "emotion": "anxiety",
    "verse": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    "reference": "Philippians 4:6",
    "explanation": "This verse reminds us to replace anxiety with prayer, turning our worries into conversations with God."
  }
]
```

**Important:** This is placeholder data for development and testing. Production content (15-20 verses per emotion, ~120 total) will be provided separately. Include real Bible verses in placeholders to verify formatting renders correctly.

[Source: architecture.md#Data Architecture, epics.md#Story 2.2 — "verses.json contains placeholder data for development; production content provided separately"]

### app/_layout.tsx — Basic Root Layout

For this story, create a minimal root layout. SuperwallProvider and font loading will be added in Story 1.2 and Epic 4.

```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

**Note:** This is intentionally minimal. Story 1.2 adds SuperwallProvider wrapping. Story 4.2 adds font loading with splash screen. The architecture specifies `_layout.tsx` as the home for all providers and startup logic, but each story adds its layer incrementally.

### app.json Configuration

Key settings to configure:

```json
{
  "expo": {
    "name": "Faith Jar",
    "slug": "faith-jar",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "faithjar",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.faithjar.app",
      "infoPlist": {
        "MinimumOSVersion": "15.1"
      }
    },
    "plugins": [
      "expo-superwall",
      "expo-router"
    ]
  }
}
```

**Notes:**
- `orientation: "portrait"` — portrait only (UX spec requirement)
- `userInterfaceStyle: "light"` — no dark mode for MVP
- `newArchEnabled: true` — required for react-native-reanimated v4
- `ios.supportsTablet: false` — iPhone only for MVP
- `bundleIdentifier` — placeholder, Oleg should provide final value
- `MinimumOSVersion: "15.1"` — Superwall requirement

## Testing Requirements

### Verification Checklist (Manual)

Since this is a project initialization story, testing is manual verification:

- [ ] `npx expo start` launches without errors
- [ ] TypeScript compilation has no errors (`npx tsc --noEmit`)
- [ ] All 6 packages appear in `package.json` dependencies
- [ ] `lib/types.ts` exports EmotionKey, Verse, EmotionConfig
- [ ] `lib/constants.ts` exports EMOTIONS with 6 entries, COLORS, TYPOGRAPHY
- [ ] `lib/verses.ts` exports getVersesForEmotion and shuffleVerses
- [ ] `lib/storage.ts` exports isOnboardingDone and setOnboardingDone
- [ ] `assets/data/verses.json` contains 18 placeholder verse entries (3 per emotion)
- [ ] `app.json` has name "Faith Jar", iOS MinimumOSVersion "15.1"
- [ ] `babel.config.js` has reanimated plugin as last entry
- [ ] No extra directories created outside `app/`, `lib/`, `assets/`

### What NOT to Test in This Story

- Do NOT run `eas build` (that's Story 1.2)
- Do NOT test on physical device (that's Story 1.2)
- Do NOT test Superwall functionality (that's Story 1.2)
- Do NOT test font rendering (that's Story 4.2)

## Latest Technical Information

### Expo SDK Version Decision

- **Expo SDK 55** released Feb 25, 2026 (React Native 0.83.2, React 19.2). New Architecture only.
- **Expo SDK 54** is the stable default — `create-expo-app@latest` creates SDK 54 projects.
- **Recommendation:** Use SDK 54 (default) for maximum stability in 1-week MVP. SDK 55 can be upgraded later if needed.
- If SDK 55 is explicitly desired: `npx create-expo-app@latest faith-jar --template default@sdk-55`

### expo-superwall

- Version 0.6.4 (published March 2, 2026) — the official Expo SDK from Superwall
- Replaces deprecated `@superwall/react-native-superwall`
- Minimum: Expo SDK 53+, iOS 15.1+
- Install via `npx expo install expo-superwall`

### react-native-reanimated

- v4.x is current — requires New Architecture (`newArchEnabled: true` in app.json)
- `npx expo install react-native-reanimated` resolves the SDK-compatible version automatically
- Babel plugin required: `react-native-reanimated/plugin` (must be last in plugins array)

## Dev Agent Record

### Agent Model Used

(to be filled during implementation)

### Debug Log References

### Completion Notes List

### Change Log

| Change | Date | Reason |
|---|---|---|
| Story created | 2026-03-02 | Initial creation via create-story workflow |
