---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2026-03-02'
inputDocuments: ['prd.md', 'architecture.md', 'ux-design-specification.md']
---

# Faith Jar - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Faith Jar, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR1:** User can view all available emotion categories on the main screen
- **FR2:** User can select an emotion category to receive a relevant Bible verse
- **FR3:** System presents 6 emotion categories: Anxiety, Sadness, Joy, Loneliness, Anger, Gratitude
- **FR4:** User can view a Bible verse matched to the selected emotion
- **FR5:** User can view a brief explanation of why the displayed verse relates to the selected emotion
- **FR6:** User can request another verse for the same emotion without returning to the emotion selection screen
- **FR7:** System selects verses without immediate repetition within a session
- **FR8:** System provides a minimum of 15-20 unique verses per emotion category
- **FR9:** New user can access the full app experience for a 7-day free trial period without payment
- **FR10:** System presents a paywall screen when the free trial expires
- **FR11:** User can purchase a monthly or annual subscription to continue using the app
- **FR12:** System locks all app functionality after trial expiry for non-subscribers
- **FR13:** System restores access immediately upon successful subscription purchase
- **FR14:** System validates subscription status on app launch
- **FR15:** User can start using the app immediately without creating an account
- **FR16:** User can reach their first verse within 3 taps from first app launch
- **FR17:** System does not require any personal information to deliver the core experience
- **FR18:** User can use the app without an internet connection (offline mode)
- **FR19:** System bundles the complete verse database locally within the app
- **FR20:** App launches and displays the main screen within acceptable load time

### NonFunctional Requirements

- **NFR1:** App cold launch to main screen (emotion selection) within 2 seconds
- **NFR2:** Verse + explanation display after emotion tap within 500ms (local DB read)
- **NFR3:** "Another verse" loads a new verse within 300ms (no perceptible delay)
- **NFR4:** App size under 50 MB to minimize download friction
- **NFR5:** No user personal data collected or stored on device in MVP
- **NFR6:** Subscription transactions processed exclusively through StoreKit 2 (Apple-managed, PCI-compliant)
- **NFR7:** App complies with Apple App Transport Security requirements
- **NFR8:** Minimum text size of 16pt for verse content to ensure readability
- **NFR9:** Sufficient color contrast ratios (WCAG AA minimum) for all text elements
- **NFR10:** VoiceOver support for core navigation (emotion selection → verse display)
- **NFR11:** Superwall SDK initializes and presents paywall reliably on trial expiry
- **NFR12:** Subscription status syncs correctly between Superwall, StoreKit, and app state
- **NFR13:** App handles Superwall SDK unavailability gracefully (no crashes, fallback behavior)

### Additional Requirements

**From Architecture:**

- Starter template: Expo with Expo Router — greenfield project initialized via `npx create-expo-app@latest faith-jar --template default`
- Core dependencies: expo-superwall, react-native-reanimated, @expo-google-fonts/lora, @expo-google-fonts/inter, expo-splash-screen
- Development Build required (not Expo Go) — Superwall uses native modules
- EAS Build profiles: development (device testing) + production (App Store submission)
- iOS deployment target: iOS 15.1 (Superwall requirement)
- SuperwallProvider wraps app in _layout.tsx; placement registration instead of manual subscription check
- Bundled JSON verse database at assets/data/verses.json (~120 entries)
- Fisher-Yates shuffle for verse randomization, stored in useRef, reset on emotion change
- AsyncStorage for onboarding completion flag (onboarding_completed key)
- ScrollView with pagingEnabled + horizontal for onboarding 3-page swipe
- No state management library — useState + route params + useRef only
- File structure: app/ (screens), lib/ (logic helpers), assets/ (data)
- TypeScript types: EmotionKey, Verse, EmotionConfig

**From UX Design:**

- Vertical card list layout for emotion selection (not grid) — full-width cards, generous spacing
- Emotion-specific accent colors with subtle atmosphere shifts on selection
- Typography hierarchy: Lora serif (20-24pt) for verses, Inter sans-serif muted color (16pt) for explanations
- Animation specs: emotion tap scale-up (200ms), verse fade-in from bottom (200-300ms), explanation delay (100ms) then fade-in, cross-fade for "another verse" (300ms)
- All animations via react-native-reanimated with Easing.out(Easing.ease) — no spring/bounce
- Portrait orientation only
- One-thumb operation design
- No loading states, no spinners — all data is local, only splash screen during font load
- Zero dead-ends in navigation
- Warm off-white background (#faf7f2), deep charcoal text (#2d2a26), soft gold accent (#c4956a)

**From Designer Screenshots (actual approved UI):**

*Emotion Selection Screen:*
- "Faith Jar" title with sparkle icon at top center
- Subtitle line 1: "How are you feeling today?"
- Subtitle line 2: "Tap to receive a Bible verse that speaks to you"
- 6 full-width rounded cards, each with: emotion-specific icon (cloud, sad face, smiley, people, flame, heart), emotion label, subtle emotion-colored background tint

*Verse Display Screen:*
- Top-left: "X Close" button (back/dismiss)
- Top-right: sparkle icon (app branding)
- Scrollable content area with: verse text in large serif, reference right-aligned in gold ("— Philippians 4:6-7"), subtle divider line
- "Why this verse?" section heading in bold
- Explanation text in muted brown color (not italic — explicitly rejected)
- Bottom center: two circular buttons — X (close/back to emotions) and refresh icon (another verse)

*Onboarding (3 swipeable pages):*
- Page 1: heart icon + "When you need God's word for this moment" + body text + "Continue" button
- Page 2: book icon + "A Bible verse + why it matters" + body text + "Continue" button
- Page 3: 3-step flow visualization (Choose → Read → Feel peace with icons) + "Peace in 30 seconds" + body text + "Get Started" button
- All pages: dot pagination indicators at bottom, gold/beige button style

**Implementation Context:**

- Designer provides frontend code (HTML/CSS or React components) for all screens — use as pixel-perfect reference
- Dev task is to integrate designer's code into Expo Router architecture, refactor to project conventions (TypeScript, reanimated, file structure), and wire up data/logic
- Do NOT rebuild UI from scratch — adapt designer's code to maintain visual fidelity

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 2 | View emotion categories on main screen |
| FR2 | Epic 2 | Select emotion to receive verse |
| FR3 | Epic 2 | 6 emotion categories presented |
| FR4 | Epic 2 | View Bible verse matched to emotion |
| FR5 | Epic 2 | View explanation of verse-emotion connection |
| FR6 | Epic 2 | Request another verse without returning |
| FR7 | Epic 2 | No immediate repetition within session |
| FR8 | Epic 2 | Minimum 15-20 verses per emotion |
| FR9 | Epic 3 | 7-day free trial access |
| FR10 | Epic 3 | Paywall on trial expiry |
| FR11 | Epic 3 | Purchase monthly/annual subscription |
| FR12 | Epic 3 | App locks after trial for non-subscribers |
| FR13 | Epic 3 | Access restored on subscription |
| FR14 | Epic 3 | Subscription validated on launch |
| FR15 | Epic 3 | No account required |
| FR16 | Epic 3 | First verse within 3 taps |
| FR17 | Epic 3 | No personal information required |
| FR18 | Epic 2 | Offline mode |
| FR19 | Epic 2 | Bundled verse database |
| FR20 | Epic 1 | App launches within acceptable time |

## Epic List

### Epic 1: Project Bootstrap & Superwall Validation
Initialize Expo project, install all dependencies, configure EAS Build, integrate SuperwallProvider, run first Development Build on device, and validate Superwall shows a test paywall. This is the critical gate — if Superwall doesn't work, nothing proceeds.
**FRs covered:** FR20

### Epic 2: Core Verse Experience
Users can select an emotion from 6 categories and receive a curated Bible verse with explanation. Users can tap "another verse" to keep drawing without repetition. Full core loop works offline with bundled verse database. Integrates designer's frontend code for both screens.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR18, FR19

### Epic 3: Onboarding & Subscription
New users see a 3-page onboarding flow on first launch. After onboarding, Superwall placement registration handles paywall logic. Trial expires after 7 days, app locks for non-subscribers, access restores on subscription. No account required.
**FRs covered:** FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17

### Epic 4: Polish & App Store Launch
Add animations (reanimated), load custom fonts (Lora + Inter), configure splash screen, ensure accessibility compliance, validate performance NFRs, create EAS production build, and submit to App Store.
**FRs covered:** NFR1-13

## Epic 1: Project Bootstrap & Superwall Validation

Initialize Expo project, install all dependencies, configure EAS Build, integrate SuperwallProvider, run first Development Build on device, and validate Superwall shows a test paywall. This is the critical gate — if Superwall doesn't work, nothing proceeds.

### Story 1.1: Initialize Expo Project & Project Structure

As a developer,
I want to initialize the Expo project with all dependencies and project structure,
So that the codebase is ready for feature development.

**Acceptance Criteria:**

**Given** no project exists
**When** developer runs `npx create-expo-app@latest faith-jar --template default`
**Then** a new Expo project is created with TypeScript configured
**And** all dependencies are installed: expo-superwall, react-native-reanimated, @expo-google-fonts/lora, @expo-google-fonts/inter, expo-splash-screen, @react-native-async-storage/async-storage
**And** project structure exists: `app/_layout.tsx`, `lib/types.ts`, `lib/constants.ts`, `lib/verses.ts`, `lib/storage.ts`, `assets/data/verses.json`
**And** TypeScript types are defined: `EmotionKey`, `Verse`, `EmotionConfig`
**And** `EMOTIONS` constant is populated with all 6 emotions (label, color, icon)
**And** `app.json` is configured with app name "Faith Jar", iOS deployment target 15.1

### Story 1.2: EAS Build & Superwall Integration

As a developer,
I want to configure EAS Build and integrate Superwall SDK,
So that the app runs on a physical device with paywall functionality validated.

**Acceptance Criteria:**

**Given** the Expo project from Story 1.1 exists
**When** `eas.json` is configured with development and production profiles
**Then** `eas build --profile development --platform ios` creates a Development Build
**And** the Development Build installs and launches on a physical iOS device
**And** `SuperwallProvider` wraps the app in `_layout.tsx`
**And** a test Superwall placement triggers and shows a paywall screen
**And** the app does not crash if Superwall fails to initialize (graceful degradation)
**And** FR20 is validated: app launches and displays a screen within 2 seconds

## Epic 2: Core Verse Experience

Users can select an emotion from 6 categories and receive a curated Bible verse with explanation. Users can tap "another verse" to keep drawing without repetition. Full core loop works offline with bundled verse database. Integrates designer's frontend code for both screens.

### Story 2.1: Emotion Selection Screen

As a user,
I want to see 6 emotion categories and tap one to receive a Bible verse,
So that I can quickly find spiritual support matched to how I feel.

**Acceptance Criteria:**

**Given** the app is launched and the main screen is displayed
**When** user views the Emotion Selection screen
**Then** 6 emotion cards are displayed in a vertical list: Anxiety, Sadness, Joy, Loneliness, Anger, Gratitude
**And** each card shows an emotion-specific icon, label, and subtle color tint (per designer's Emotion Selection screen code)
**And** the screen displays "Faith Jar" title with sparkle icon, subtitle "How are you feeling today?", and "Tap to receive a Bible verse that speaks to you"
**And** tapping any emotion card navigates to `/verse?emotion={emotionKey}`
**And** FR1, FR2, FR3 are satisfied

### Story 2.2: Verse Database & Data Layer

As a developer,
I want a local verse database with randomization logic,
So that users receive non-repeating relevant verses for each emotion.

**Acceptance Criteria:**

**Given** `assets/data/verses.json` contains the verse database
**When** `getVersesForEmotion(emotion)` is called from `lib/verses.ts`
**Then** it returns an array of `Verse` objects filtered by the given emotion
**And** `shuffleVerses(verses)` is a pure function in `lib/verses.ts` implementing Fisher-Yates algorithm
**And** session-level state (shuffled array, current index) is managed by the screen component via `useRef`, not by the data layer
**And** reset occurs on emotion change; re-shuffle when all verses for an emotion are exhausted
**And** each emotion has a minimum of 15-20 verses in the database
**And** each verse entry contains: id, emotion, verse, reference, explanation
**And** `verses.json` contains placeholder data for development; production content is provided separately
**And** FR7, FR8, FR18, FR19 are satisfied

### Story 2.3: Verse Display Screen

As a user,
I want to read a Bible verse with an explanation of why it relates to my emotion, and tap "another verse" if it doesn't resonate,
So that I find spiritual comfort that speaks to my specific feeling.

**Acceptance Criteria:**

**Given** user has selected an emotion from the Emotion Selection screen
**When** the Verse Display screen loads with the emotion route param (using designer's Verse Display screen code)
**Then** a verse is displayed in large serif font with its Bible reference right-aligned in gold
**And** below the verse, "Why this verse?" section heading appears with explanation text in muted brown
**And** the screen is scrollable for longer verses/explanations
**And** top-left shows "X Close" button that navigates back to Emotion Selection
**And** bottom center shows two circular buttons: X (close) and refresh icon (another verse)
**And** tapping the refresh icon loads the next verse from the shuffled list without page reload (cross-fade position)
**And** the sparkle icon appears at top-right (app branding)
**And** FR4, FR5, FR6 are satisfied

## Epic 3: Onboarding & Subscription

New users see a 3-page onboarding flow on first launch. After onboarding, Superwall placement registration handles paywall logic. Trial expires after 7 days, app locks for non-subscribers, access restores on subscription. No account required.

### Story 3.1: Onboarding Flow

As a new user,
I want to see a brief introduction to the app on first launch,
So that I understand what Faith Jar offers before I start using it.

**Acceptance Criteria:**

**Given** the app is launched for the first time (onboarding not completed)
**When** the app opens
**Then** the user is navigated to `/onboarding` instead of the main screen
**And** 3 swipeable pages are displayed using ScrollView with `pagingEnabled` + `horizontal`
**And** page 1 shows heart icon + "When you need God's word for this moment" + body text + "Continue" button
**And** page 2 shows book icon + "A Bible verse + why it matters" + body text + "Continue" button
**And** page 3 shows 3-step flow visualization (Choose → Read → Feel peace) + "Peace in 30 seconds" + body text + "Get Started" button
**And** dot pagination indicators at the bottom reflect the current page via `onMomentumScrollEnd`
**And** "Continue" buttons advance to the next page, "Get Started" completes onboarding
**And** on completion, `setOnboardingDone(true)` is called via `lib/storage.ts` (AsyncStorage)
**And** on subsequent launches, the app skips onboarding and goes directly to Emotion Selection
**And** FR15, FR16, FR17 are satisfied

### Story 3.2: Subscription & Access Control

As a user,
I want to use the app free for 7 days and then subscribe to continue,
So that I can evaluate the experience before paying.

**Acceptance Criteria:**

**Given** onboarding is completed (Story 3.1)
**When** the user taps "Get Started" on the last onboarding page
**Then** a Superwall placement is registered, and Superwall decides whether to show a paywall or let the user through

**Given** the app is launched on subsequent visits (onboarding already done)
**When** `_layout.tsx` initializes
**Then** a Superwall placement is registered on app launch
**And** Superwall automatically shows paywall if trial has expired, or lets user through if subscription is active or trial is ongoing

**Given** the user's 7-day free trial has expired and they have no active subscription
**When** the user opens the app
**Then** Superwall presents the paywall screen
**And** the user cannot access Emotion Selection or Verse Display until subscribing

**Given** the user purchases a subscription through the Superwall paywall
**When** StoreKit 2 confirms the transaction
**Then** the paywall dismisses and the user is navigated to Emotion Selection with full access
**And** access is restored immediately

**Given** Superwall SDK is unavailable or fails to initialize
**When** the app launches
**Then** the app does not crash and shows the main screen without paywall (graceful degradation)
**And** FR9, FR10, FR11, FR12, FR13, FR14 are satisfied

## Epic 4: Polish & App Store Launch

Add animations (reanimated), load custom fonts (Lora + Inter), configure splash screen, ensure accessibility compliance, validate performance NFRs, create EAS production build, and submit to App Store.

### Story 4.1: Animations

As a user,
I want smooth, calming transitions between screens and verse changes,
So that the app feels meditative and premium, not mechanical.

**Acceptance Criteria:**

**Given** the user taps an emotion card on the Emotion Selection screen
**When** the tap is registered
**Then** the card does a scale-up animation (`withTiming(1.05, { duration: 200 })`) via react-native-reanimated

**Given** the user navigates to the Verse Display screen
**When** the screen loads
**Then** the verse text fades in from bottom (`withTiming(1, { duration: 300 })` on opacity)
**And** the explanation fades in with 100ms delay after the verse (`withTiming(1, { duration: 300 })`)

**Given** the user taps the refresh icon ("another verse")
**When** the next verse loads
**Then** the current verse fades out (200ms) and the new verse cross-fades in (300ms)

**And** all animations use `Easing.out(Easing.ease)` — no spring or bounce
**And** all animations are implemented via `react-native-reanimated`, never React Native core `Animated`

### Story 4.2: Custom Fonts, Splash Screen & Accessibility

As a user,
I want the app to load with beautiful typography, a smooth launch experience, and be accessible,
So that the app feels premium from the first moment and is usable by everyone.

**Acceptance Criteria:**

**Given** the app is launching
**When** fonts are loading via `useFonts()` (Lora + Inter)
**Then** `expo-splash-screen` remains visible until fonts are fully loaded
**And** splash screen hides only after fonts are ready — no flash of unstyled text

**Given** fonts are loaded
**When** the Emotion Selection or Verse Display screen renders
**Then** verse text uses Lora serif font (20-24pt)
**And** explanation text uses Inter sans-serif in muted brown color (16pt)
**And** emotion labels use Inter sans-serif medium weight (16-18pt)
**And** system font is used as fallback if font loading fails — render is never blocked

**Given** the app is used with VoiceOver enabled
**When** the user navigates the app
**Then** all emotion cards have accessible labels
**And** verse text and explanation are readable by screen reader
**And** all interactive buttons (close, refresh) have accessibility labels
**And** minimum text size is 16pt, color contrast meets WCAG AA
**And** NFR1, NFR8, NFR9, NFR10 are satisfied

### Story 4.3: Production Build & App Store Submission

As a product owner,
I want the app submitted to the App Store,
So that users can discover and download Faith Jar.

**Acceptance Criteria:**

**Given** all features from Epics 1-3 and Stories 4.1-4.2 are complete
**When** `eas build --profile production --platform ios` is run
**Then** a production iOS build is created successfully
**And** app size is under 50 MB (NFR4)

**Given** the production build exists
**When** app metadata is configured in App Store Connect
**Then** app name, description, screenshots, and category are set
**And** subscription pricing, trial length, and renewal terms are clearly disclosed
**And** the build is submitted via EAS Submit
**And** app complies with Apple ATS requirements (NFR7)
**And** NFR4, NFR6, NFR7 are satisfied
