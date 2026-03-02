---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['prd.md', 'ux-design-specification.md', 'product-brief-Faith-Jar-2026-02-27.md']
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-02'
project_name: 'Faith Jar'
user_name: 'Oleg'
date: '2026-03-01'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
20 FRs across 5 capability areas:
- **Emotion Discovery (FR1-FR3):** Display 6 emotion categories, allow selection. Architecturally trivial — static list, tap handler.
- **Verse Delivery (FR4-FR8):** Display verse + explanation for selected emotion, "another verse" without repetition in session. Requires: local data access layer, session-level randomization logic.
- **Subscription & Access Control (FR9-FR14):** 7-day free trial, hard paywall on expiry, subscription validation on launch. Requires: Superwall SDK integration, subscription state management, app lock mechanism.
- **Onboarding (FR15-FR17):** No account, first verse within 3 taps, zero personal data. Architecturally: no auth layer, no user storage, no backend.
- **App Foundation (FR18-FR20):** Offline mode, bundled verse database, fast launch. Requires: local data bundling strategy, optimized app startup.

**Non-Functional Requirements:**
13 NFRs in 4 categories:
- **Performance (NFR1-4):** Cold launch <2s, verse load <500ms, "another verse" <300ms, app size <50MB. All achievable with local data — no network latency.
- **Security (NFR5-7):** No user data collected, StoreKit 2 for payments, ATS compliance. Minimal security surface — no auth, no API, no user storage.
- **Accessibility (NFR8-10):** Min 16pt text, WCAG AA contrast, VoiceOver support. Standard React Native accessibility props.
- **Integration (NFR11-13):** Superwall SDK reliability, subscription state sync, graceful degradation if SDK unavailable.

**Scale & Complexity:**

- Primary domain: Mobile app (React Native, iOS-first)
- Complexity level: Low
- Estimated architectural components: ~6 (navigation, data layer, verse logic, subscription manager, UI components, onboarding flow)

### Technical Constraints & Dependencies

- **Framework:** React Native (user's choice for development speed + future Android)
- **Timeline:** 1 week development — architecture must be maximally simple
- **Paywall SDK:** Superwall (manages paywall UI, A/B testing, trial tracking)
- **Payment:** StoreKit 2 (via Superwall integration)
- **No backend:** Zero server infrastructure for MVP
- **Data:** Static verse database bundled locally (~60KB)
- **Animations:** react-native-reanimated for native-performance transitions
- **Fonts:** Custom fonts (Lora/Merriweather serif + Inter/SF Pro sans-serif)

### Cross-Cutting Concerns Identified

- **Subscription state** — affects all screens: onboarding shown once, paywall on trial expiry, app lock for non-subscribers. Single source of truth needed.
- **Emotion context** — selected emotion propagates from selection screen to verse display (color theme, verse filtering). Lightweight state management.
- **Session verse tracking** — "no repeat" logic spans multiple "another verse" taps within a session. Session-scoped state, reset on app relaunch or emotion change.

## Starter Template Evaluation

### Primary Technology Domain

Mobile app (React Native via Expo) based on project requirements: iOS-first, 1-week timeline, single SDK integration (Superwall), offline-first with bundled data.

### Starter Options Considered

| Option | Verdict |
|---|---|
| **Expo (managed)** | Best fit — official RN recommendation, Superwall has dedicated Expo SDK, fastest path to App Store |
| **React Native CLI (bare)** | Overkill — manual Xcode/Android Studio config, no benefit for this project |
| **Ignite (Infinite Red)** | Over-engineered — opinionated boilerplate with MobX, unnecessary for 3-screen app |

### Selected Starter: Expo with Expo Router

**Rationale:**
- Superwall has a dedicated Expo SDK (`expo-superwall`) requiring Expo SDK 53+
- Expo Router provides file-based navigation — file = route, zero config for 3 screens
- EAS Build handles App Store submission without local Xcode build complexity
- `react-native-reanimated` fully supported via `npx expo install`
- Custom fonts via `@expo-google-fonts` with async loading + `expo-splash-screen`
- Official React Native recommendation for new projects in 2026

**Initialization Command:**

```bash
npx create-expo-app@latest faith-jar --template default
```

**Core Dependencies to Add:**

```bash
npx expo install expo-superwall react-native-reanimated @expo-google-fonts/lora @expo-google-fonts/inter expo-splash-screen
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
TypeScript — configured out of the box, zero setup.

**Navigation:**
Expo Router — file-based routing built on React Navigation. Each file in `app/` directory = a route.

**Build Tooling:**
Metro bundler for development, EAS Build for production iOS builds.

**State Management:**
None needed — `useState` + route params sufficient for 3 screens. No Redux, Zustand, or Context.

**Project Structure:**

```
app/
  _layout.tsx          — Root layout: SuperwallProvider, font loading, onboarding check
  index.tsx            — Emotion Selection Screen (main route: /)
  verse.tsx            — Verse Display Screen (route: /verse)
  onboarding.tsx       — Onboarding flow (3 pages within single screen component)
assets/
  data/
    verses.json        — Bundled verse database (~120 entries)
```

**Development Workflow:**
- Development Build (not Expo Go) — required for Superwall native modules
- First EAS build on Day 1 — validate Superwall integration immediately
- Hot reload for UI development after initial build

**Critical Implementation Order (from Party Mode review):**
1. Day 1: Create project, install expo-superwall, run first Development Build, verify paywall shows
2. Day 1-2: Core UI (emotion selection, verse display) with hardcoded test data
3. Day 2-3: Verse database integration, randomization logic, animations
4. Day 3-4: Onboarding flow, font loading, polish
5. Day 4-5: Final testing, EAS production build, App Store submission

**Key Risk: Superwall Integration**
Superwall is the only external dependency that could block development. Validate on Day 1. If it fails, investigate immediately — everything else is standard Expo code.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Superwall integration pattern (SuperwallProvider + useSuperwall hook)
- Subscription state → navigation flow
- Onboarding persistence (AsyncStorage)

**Important Decisions (Shape Architecture):**
- Verse database schema and randomization algorithm
- Emotion theming configuration structure
- EAS Build configuration

**Deferred Decisions (Post-MVP):**
- Analytics integration (beyond Superwall built-in)
- Favorites persistence (requires data layer expansion)
- Social sharing (requires share API integration)
- Push notifications (requires notification service)

### Data Architecture

**Decision:** Bundled JSON file (`assets/data/verses.json`)
**Rationale:** ~120 entries, ~60KB, read-only data. JSON imported directly — no database engine needed.

**Schema:**
```json
{
  "id": number,
  "emotion": "anxiety" | "sadness" | "joy" | "loneliness" | "anger" | "gratitude",
  "verse": string,
  "reference": string,
  "explanation": string
}
```

**Randomization:** Fisher-Yates shuffle on emotion-filtered array, stored in `useRef`. Sequential iteration through shuffled list. Re-shuffle when exhausted. Reset on emotion change.

**Onboarding State:** AsyncStorage key `onboarding_completed`. Checked once at app launch in `_layout.tsx`.

### Frontend Architecture

**State Management:** No external library. `useState` for local component state, route params for screen-to-screen data passing, `useRef` for session-scoped verse tracking.

**Emotion Theming:** Single configuration object (`EMOTIONS` constant) mapping emotion keys to `{ label, color, icon }`. Used by both Emotion Selection and Verse Display screens. Emotion key passed as route param.

**Navigation Flow:**
```
App Launch → _layout.tsx
  ├── Onboarding not done → /onboarding → Superwall placement → /
  └── Onboarding done → Superwall placement registration
       → Superwall decides: show paywall or let through
/ (Emotion Selection) → /verse?emotion=anxiety → / (back)
```

**Note:** No manual subscription check. Superwall placement registration handles all paywall logic — if user has active subscription, Superwall skips the paywall automatically. We never call `getSubscriptionStatus()` ourselves.

**Component Structure:** Minimal — no shared component library needed for 3 screens. Each screen is self-contained. Shared: `EMOTIONS` config, `verses.json` data access helper, color/typography constants.

### Infrastructure & Deployment

**Build System:** EAS Build (Expo Application Services)
- Development profile: for testing with Superwall on device
- Production profile: for App Store submission

**iOS Configuration:**
- Deployment target: iOS 15.1 (Superwall requirement)
- Bundle identifier: TBD (e.g., `com.oleg.faithjar`)

**Environment:** Single environment for MVP. No staging/production split needed — no backend, no environment variables beyond Superwall API key.

### Decision Impact Analysis

**Implementation Sequence:**
1. Project init + Superwall integration (validates critical dependency)
2. Core UI screens (emotion selection, verse display)
3. Verse database + randomization logic
4. Onboarding flow + AsyncStorage persistence
5. Animations + font loading + polish
6. EAS production build + App Store submission

**Cross-Component Dependencies:**
- `_layout.tsx` depends on: AsyncStorage (onboarding), Superwall (subscription), expo-font (fonts)
- `verse.tsx` depends on: route params (emotion), verses.json (data), EMOTIONS config (theming)
- `onboarding.tsx` depends on: AsyncStorage (write flag), Superwall (trigger paywall after)

## Implementation Patterns & Consistency Rules

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Screen files | kebab-case (Expo Router default) | `verse.tsx`, `index.tsx` |
| Components | PascalCase | `EmotionCard`, `VerseDisplay` |
| Functions/hooks | camelCase | `getRandomVerse()`, `useVerses()` |
| Variables | camelCase | `selectedEmotion`, `currentVerse` |
| Config constants | UPPER_SNAKE_CASE | `EMOTIONS`, `COLORS` |
| TypeScript types | PascalCase | `Verse`, `Emotion`, `EmotionKey` |
| JSON data fields | camelCase | `{ "id": 1, "emotion": "anxiety" }` |

### File Organization Rules

```
app/
  _layout.tsx           — Root layout (providers, fonts, nav logic)
  index.tsx             — Emotion Selection screen
  verse.tsx             — Verse Display screen
  onboarding.tsx        — Onboarding screen (3 pages inside)
lib/
  constants.ts          — EMOTIONS config, COLORS, typography constants
  verses.ts             — getVersesForEmotion(), getRandomVerse() helpers
  types.ts              — TypeScript types (Verse, EmotionKey)
  storage.ts            — AsyncStorage helpers (onboarding flag)
assets/
  data/
    verses.json         — Verse database
```

**Rules:**
- No additional directories (`utils/`, `helpers/`, `services/`) — `lib/` is sufficient for 4 files
- No new directories without explicit approval
- Screen files in `app/`, logic in `lib/`, static data in `assets/`

### TypeScript Patterns

```typescript
type EmotionKey = 'anxiety' | 'sadness' | 'joy' | 'loneliness' | 'anger' | 'gratitude';

interface Verse {
  id: number;
  emotion: EmotionKey;
  verse: string;
  reference: string;
  explanation: string;
}

interface EmotionConfig {
  label: string;
  color: string;
  icon: string;
}
```

### Error Handling Patterns

- **Superwall SDK fail:** App does not crash. If Superwall fails to initialize — show main screen without paywall (graceful degradation). Log with `console.error`.
- **Font loading fail:** Use system font as fallback. Never block render.
- **Empty verse list:** Should not happen (static JSON). If `getVersesForEmotion()` returns empty array — show fallback text, do not crash.
- **No try-catch wrappers** around sync operations. Only for async (AsyncStorage, Superwall).
- **No global error boundary** — overkill for MVP.

### Loading State Patterns

- **App startup:** `expo-splash-screen` visible while `useFonts()` loads custom fonts. Splash hide → render.
- **Verse loading:** No loading state — local data, instant access (<1ms).
- **No spinners anywhere** — all data is offline, all reads are instant. Only loading = splash screen at startup.

### Animation Patterns

All animations via `react-native-reanimated` (never `Animated` from React Native core):

| Animation | Implementation |
|---|---|
| Emotion tap | `withTiming(1.05, { duration: 200 })` on scale transform |
| Verse appearance | `withTiming(1, { duration: 300 })` on opacity, fade from bottom |
| Explanation reveal | 100ms delay, then `withTiming(1, { duration: 300 })` on opacity |
| "Another verse" cross-fade | opacity out (200ms) → opacity in (300ms) |
| Back to emotions | Reverse of entry animation |

Timing config: `Easing.out(Easing.ease)` for all transitions. No spring/bounce.

### Enforcement Rules

**AI agents implementing stories MUST:**
1. Follow naming conventions from the table above — no exceptions
2. Place files ONLY in designated directories (`app/`, `lib/`, `assets/`)
3. Not create new directories without explicit approval
4. Not add state management libraries (no Redux, Zustand, Context)
5. Not add error boundary or global error handler
6. Use `react-native-reanimated` for ALL animations
7. Not add loading spinners or skeleton screens
8. Keep each screen self-contained — no shared component library

## Project Structure & Boundaries

### Complete Project Directory Structure

```
faith-jar/
├── app.json                    — Expo app config (name, slug, iOS target, Superwall plugin)
├── eas.json                    — EAS Build profiles (development + production)
├── package.json                — Dependencies and scripts
├── tsconfig.json               — TypeScript config (Expo default)
├── .gitignore                  — Standard Expo gitignore
├── app/
│   ├── _layout.tsx             — Root layout: SuperwallProvider, fonts, nav logic
│   ├── index.tsx               — Emotion Selection screen (route: /)
│   ├── verse.tsx               — Verse Display screen (route: /verse)
│   └── onboarding.tsx          — Onboarding flow, 3 pages (route: /onboarding)
├── lib/
│   ├── constants.ts            — EMOTIONS config, COLORS, TYPOGRAPHY constants
│   ├── verses.ts               — getVersesForEmotion(), shuffleVerses() helpers
│   ├── types.ts                — Verse, EmotionKey, EmotionConfig types
│   └── storage.ts              — AsyncStorage helpers (isOnboardingDone, setOnboardingDone)
└── assets/
    └── data/
        └── verses.json         — Verse database (~120 entries)
```

### Requirements to Structure Mapping

| FR Category | Files | Responsibility |
|---|---|---|
| Emotion Discovery (FR1-3) | `app/index.tsx`, `lib/constants.ts` | Emotion selection screen, EMOTIONS config |
| Verse Delivery (FR4-8) | `app/verse.tsx`, `lib/verses.ts`, `assets/data/verses.json` | Verse display, randomization, data |
| Subscription (FR9-14) | `app/_layout.tsx` | SuperwallProvider, subscription check, paywall trigger |
| Onboarding (FR15-17) | `app/onboarding.tsx`, `lib/storage.ts` | 3-page onboarding, AsyncStorage flag |
| App Foundation (FR18-20) | `app/_layout.tsx`, `assets/data/verses.json` | Font loading, splash screen, bundled data |

### Architectural Boundaries

**Screen Boundaries:**
Each screen (`index.tsx`, `verse.tsx`, `onboarding.tsx`) is self-contained. Communicates with others only through Expo Router navigation + route params. No shared state between screens beyond route params.

**Data Boundary:**
`lib/verses.ts` is the single access point to `verses.json`. Screens never import JSON directly. All data access through helper functions.

**SDK Boundary:**
Superwall lives only in `app/_layout.tsx` (SuperwallProvider) and is accessed via `useSuperwall()` hook. No other file imports Superwall directly.

**Storage Boundary:**
AsyncStorage is wrapped in `lib/storage.ts`. Screens call `isOnboardingDone()` and `setOnboardingDone()`, never interact with AsyncStorage directly.

### Data Flow

```
App Launch
  → _layout.tsx: load fonts (expo-font) + check onboarding (storage.ts)
  → _layout.tsx: SuperwallProvider initializes
  → If onboarding not done → /onboarding
  → If onboarding done → register Superwall placement (Superwall decides paywall or skip) → /

Emotion Selection (index.tsx)
  → User taps emotion card
  → router.push({ pathname: '/verse', params: { emotion: 'anxiety' } })

Verse Display (verse.tsx)
  → Read emotion from route params
  → verses.ts: getVersesForEmotion(emotion) → filtered + shuffled array
  → Display verse[0]
  → "Another verse" → display verse[1], verse[2], ...
  → Back → router.back() → index.tsx

Onboarding (onboarding.tsx)
  → 3 swipeable pages (ScrollView with pagingEnabled + horizontal, no extra library)
  → Dot indicators track current page via onMomentumScrollEnd
  → "Get Started" (last page) → storage.ts: setOnboardingDone(true)
  → Superwall: register placement (Superwall decides: paywall or skip)
  → router.replace('/')
```

### External Integration Points

| Integration | Location | Method |
|---|---|---|
| Superwall SDK | `app/_layout.tsx` | `SuperwallProvider` wraps app, `useSuperwall()` for subscription status |
| StoreKit 2 | via Superwall | Superwall handles payment flow internally |
| AsyncStorage | `lib/storage.ts` | Onboarding completion flag only |
| expo-font | `app/_layout.tsx` | `useFonts()` hook for Lora + Inter |
| expo-splash-screen | `app/_layout.tsx` | Keep splash visible while fonts load |
| react-native-reanimated | `app/index.tsx`, `app/verse.tsx` | Animations on emotion cards and verse transitions |

## Validation

### Coherence Check

All sections reference the same project structure, technology stack (Expo + Expo Router + Superwall), and navigation flow. No contradictions detected between:
- Starter Template → Project Structure
- Core Decisions → Implementation Patterns
- Navigation Flow → Data Flow
- Cross-Cutting Concerns → Boundaries

### Coverage Check

All 20 FRs mapped to specific files in Requirements-to-Structure table. All 13 NFRs addressed:
- Performance NFRs → covered by offline-first architecture (local JSON, no network)
- Security NFRs → no user data, StoreKit 2 via Superwall
- Accessibility NFRs → noted in Implementation Patterns
- Integration NFRs → Superwall error handling pattern defined

### Implementation Readiness Check

- All files listed in project structure have clear responsibilities
- Data schema defined with types
- Navigation flow deterministic with no ambiguity
- Superwall integration pattern specified (SuperwallProvider + placement registration)
- Animation specs include exact timing and easing values
- Error handling patterns defined for all async operations

### Party Mode Review Changes Applied

1. **Simplified navigation flow** — removed manual subscription check, replaced with Superwall placement registration (Superwall decides paywall vs. pass-through automatically)
2. **Onboarding pagination** — specified ScrollView with `pagingEnabled` + `horizontal` props, dot indicators via `onMomentumScrollEnd`, no extra library needed
3. **Removed N/A sections** — Authentication & Security and API & Communication sections removed (not applicable for offline MVP with no backend)
