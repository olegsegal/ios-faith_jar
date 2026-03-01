---
stepsCompleted: [1, 2]
inputDocuments: ['prd.md', 'ux-design-specification.md', 'product-brief-Faith-Jar-2026-02-27.md']
workflowType: 'architecture'
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
