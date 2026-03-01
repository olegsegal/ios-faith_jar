---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments: ['product-brief-Faith-Jar-2026-02-27.md', 'brainstorming-session-2026-02-27.md']
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 0
classification:
  projectType: mobile_app
  domain: general
  complexity: low
  projectContext: greenfield
workflowType: 'prd'
---

# Product Requirements Document - Faith Jar

**Author:** Oleg
**Date:** 2026-02-28

## Executive Summary

Faith Jar is a cross-platform mobile app (React Native, iOS-first) that digitizes the physical "Faith Jar" experience — a jar filled with color-coded Bible verse slips matched to emotions. Users select one of 6 emotions (Anxiety, Sadness, Joy, Loneliness, Anger, Gratitude), receive a curated Bible verse relevant to that emotion along with a brief explanation of why this verse applies, and can tap "Another verse" to keep drawing until a verse resonates.

The app addresses a specific behavioral pattern: Christians seeking emotional support turn to Scripture but lack a fast, curated path from emotion to relevant verse. Current alternatives — physical jars (not portable, limited), googling verses (fragmented, effortful), pastor social media (not on-demand) — all introduce friction between the moment of need and spiritual comfort. Faith Jar eliminates that friction: under 30 seconds from opening the app to reading a relevant verse with context.

This is an MVP-first experiment targeting the US market. The primary objective is demand validation and market learning, not immediate revenue. Two competitors launched recently (September and December 2025) with weak execution — one overloaded with features and a cluttered UI ("God is Above"), the other behind a $6.99 paywall with no verse explanations (Pocket Promises). The market is nascent and growing (upward Google Trends for "Faith Jar").

### What Makes This Special

- **Verse + Explanation, not just text.** Each verse comes with a brief human-written note explaining how it relates to the selected emotion. Users immediately understand the connection between their feeling and God's word — no interpretation guesswork.
- **"Another verse" as a digital advantage.** Physical jars give you one slip. Faith Jar lets you keep drawing until the right verse speaks to your heart, transforming "random selection" into "guided search for comfort."
- **Simplicity as strategy.** Intentionally minimal where competitors are cluttered. No shop, no bloat, no account required. Beautiful design, focused core flow, speed-to-value.
- **Clear evolution path.** MVP validates demand → MVP+ adds retention features (favorites, sharing, prayer templates) → V2 introduces AI-powered personal verse interpretation (3 depth levels) as the monetization engine and primary market differentiator.

## Project Classification

- **Project Type:** Mobile App (React Native, iOS-first)
- **Domain:** Lifestyle / Spiritual wellness
- **Complexity:** Low — local verse database, minimal architecture, no backend for MVP
- **Project Context:** Greenfield — new product built from scratch

## Success Criteria

### User Success

- User finds a resonating verse within 3 taps: select emotion → read verse + explanation → optional "another verse"
- The verse explanation immediately clarifies why this verse relates to the user's emotion — no guesswork
- Time from app open to spiritual comfort: under 30 seconds
- Users return to the app during emotional moments and as a daily spiritual routine

### Business Success

This is a demand validation experiment. Success is measured by unit economics, not scale.

**Primary metrics (paid advertising funnel):**

| Funnel Stage | Metric | Measurement |
|---|---|---|
| App Store page view → Install | Conversion rate | App Store Connect |
| Install → Free trial started | Trial start rate | Analytics / Superwall |
| Free trial → Paid subscription | Trial-to-paid conversion | Analytics / Superwall |
| Overall | Cost per Install (CPI) | Ad platform |
| Overall | ROI (revenue vs. ad spend) | Manual calculation |

**Monetization model:** Hard paywall with 7-day free trial. Subscription pricing ~$4.99/month or ~$29.99/year (final pricing TBD).

**Go/No-Go decision (after 2-week ad test):**
- If unit economics are viable (CPI and trial-to-paid conversion yield positive or near-positive ROI) → proceed to MVP+ and grow
- If unit economics are clearly negative with no optimization path → kill or pivot

### Technical Success

- App launches and runs without crashes (crash-free rate > 99%)
- App size under 50 MB (fast download, low barrier)
- Smooth UI performance (no jank on verse transitions)
- Built within 1 week — architecture must be simple enough for this timeline

### Measurable Outcomes

| Outcome | Target | Timeline |
|---|---|---|
| Working MVP in App Store | Published and functional | Week 1 |
| Ad campaign launched | Driving traffic to App Store page | Week 2-3 |
| Funnel data collected | Statistically meaningful sample | Week 3 |
| Go/No-Go decision made | Based on unit economics | End of Week 3 |

## User Journeys

### Journey 1: Maria — Seeking Comfort in a Moment of Anxiety

**Persona:** Maria, 28, young professional Christian woman. Overwhelmed by work pressure and uncertainty about the future. Attends church regularly but needs spiritual support between Sundays.

**Opening Scene:** It's 11 PM on a Tuesday. Maria can't sleep — tomorrow's presentation at work has her spiraling. She's already scrolled through Instagram looking for a pastor's post about anxiety, googled "Bible verses for worry," and found a generic listicle that didn't help. She remembers the Faith Jar app she downloaded two days ago.

**Rising Action:** Maria opens Faith Jar. Six emotions greet her — she taps "Anxious." Instantly, a verse appears: *"Cast all your anxiety on him because he cares for you." — 1 Peter 5:7*. Below it, a brief explanation: *"This verse reminds you that anxiety isn't yours to carry alone. God invites you to hand over the weight — not because you're weak, but because He actively cares about what's troubling you right now."*

**Climax:** Maria reads the explanation and feels seen. The connection between her sleepless worry and God's invitation to let go clicks immediately. She doesn't need to interpret anything — the app bridged the gap between ancient text and her 11 PM anxiety. She whispers a short prayer and feels the tension ease.

**Resolution:** Maria falls asleep calmer. The next morning, she opens the app again — this time tapping "Anxious" before her presentation. She gets a different verse. This one resonates even more. She screenshots it and texts it to her friend who's also stressed about work. Faith Jar becomes her go-to before stressful moments.

**Requirements revealed:** Emotion selection, verse + explanation display, "another verse" functionality, fast app launch, works offline.

---

### Journey 2: Grace — Morning Gratitude Ritual

**Persona:** Grace, 35, Filipino-American mother of two. Deeply devout, familiar with physical Faith Jar from her community. Uses faith practices as daily routine.

**Opening Scene:** Grace wakes up at 6 AM before her kids. This is her quiet time — 15 minutes of prayer and reflection before the household chaos begins. She used to pull a slip from her physical Faith Jar, but the slips are worn and she's read them all multiple times.

**Rising Action:** Grace opens Faith Jar and taps "Gratitude." A verse appears: *"Give thanks in all circumstances; for this is God's will for you in Christ Jesus." — 1 Thessalonians 5:18*. The explanation reads: *"Gratitude isn't reserved for good days. This verse calls you to find thankfulness even in the hard moments — because acknowledging God's presence in all circumstances deepens your trust in His plan."*

**Climax:** Grace pauses. Yesterday was hard — her youngest was sick, she argued with her husband, she felt stretched thin. But reading this verse reframes her morning. She uses it as the foundation for her prayer: thanking God for her family, even in the messy moments. She taps "Another verse" and gets a second gratitude verse that she saves mentally for tonight's prayer.

**Resolution:** Grace shares the verse with her church WhatsApp group with a short message: "This spoke to me this morning." Three women reply with heart emojis. Faith Jar replaces her worn-out physical jar and becomes part of her morning ritual. She tells her sister in the Philippines about the app.

**Requirements revealed:** Positive emotion support (not just comfort), "another verse" for building richer practice, quick session (under 2 minutes), content quality that supports prayer.

---

### Journey 3: New User — Discovery, First Experience, and Paywall Decision

**Persona:** Alex, 24, college student. Casually Christian — attends church with friends sometimes. Saw a Faith Jar ad on Instagram while scrolling at night.

**Opening Scene:** Alex sees an ad: "Feeling anxious? Find peace in Scripture in 30 seconds." He's been stressed about finals and curious. He taps the ad, lands on the App Store page, sees the clean screenshots and 4.5-star rating. Downloads the app.

**Rising Action:** Alex opens Faith Jar for the first time. No account creation, no lengthy onboarding — just six emotions on a beautiful screen. He taps "Anxiety" (finals stress is real). A verse appears with an explanation that connects directly to the feeling of being overwhelmed. He thinks, "Huh, that actually makes sense." He taps "Another verse" — gets another one that hits differently. He reads both explanations.

**Climax:** Over the next 5 days, Alex opens the app 4 times — twice for anxiety, once for sadness (after a breakup text), once for loneliness (Sunday night in his dorm). Each time, the verse + explanation combo gives him something to hold onto. On day 6, he gets the paywall notification: "Your free trial ends tomorrow. Continue your spiritual journey for $4.99/month."

**Resolution — Convert:** Alex thinks about it. $4.99 is less than one coffee. The app has become his go-to when he feels low. He subscribes. **Resolution — Churn:** Alex thinks $4.99 is too much for an app he uses a few times a week. He doesn't subscribe. The app locks. He goes back to googling verses — but remembers how much better the curated experience was.

**Requirements revealed:** Frictionless onboarding (no account), paywall UX (trial countdown, clear value communication), trial-to-paid conversion flow, App Store page optimization, ad attribution tracking.

---

### Journey 4: Edge Case — Verse Doesn't Resonate

**Persona:** Maria (returning user), feeling lonely after moving to a new city.

**Opening Scene:** Maria taps "Loneliness." She receives a verse about God being with her always. The explanation talks about never being truly alone in God's presence. Maria reads it but thinks, "I know God is with me, but I miss having actual people around. This doesn't help right now."

**Rising Action:** She taps "Another verse." A new verse appears — this one about God placing the lonely in families and communities. The explanation connects loneliness to God's design for human connection and His promise to bring the right people into her life. Maria reads it twice.

**Climax:** This verse acknowledges her actual need — not just spiritual presence, but human connection. The explanation validates her feeling instead of dismissing it. She feels understood rather than lectured.

**Resolution:** Maria realizes that not every verse will hit on the first try — but the "another verse" button means she's never stuck with one that doesn't resonate. The app handles the miss gracefully by making the next draw effortless. She develops a pattern: draw, read, decide — keep or try again.

**Requirements revealed:** Sufficient verse variety per emotion (minimum 15-20 per category to avoid repetition), quality of explanations must address different facets of each emotion, "another verse" must feel instant and seamless, no dead-ends.

## Mobile App Specific Requirements

### Project-Type Overview

Faith Jar is built with React Native, targeting iOS as the primary platform for MVP. React Native enables rapid development (1-week target) with a clear path to Android if the hypothesis validates. The app is content-driven with minimal device feature requirements — no camera, GPS, sensors, or native APIs beyond standard UI and subscription management.

### Technical Architecture Considerations

**Platform & Framework:**
- **Framework:** React Native
- **Primary platform:** iOS (MVP)
- **Future platform:** Android (if MVP validates)
- **Min iOS version:** TBD during architecture phase

**Offline Mode:**
- Verse database bundled locally with the app (preferred — zero latency, no network dependency)
- Estimated size: 6 emotions × 20 verses × ~500 bytes per entry ≈ ~60 KB (negligible — local bundling is feasible)
- Core experience must work without internet connection

**Data Architecture:**
- Local database: emotion → verse mappings with explanation text
- No backend API for MVP — all data is on-device
- Verse database is a static JSON/SQLite file bundled with the app

### Subscription & Paywall

- **Paywall SDK:** Superwall (handles paywall UI, A/B testing, analytics)
- **Payment processing:** StoreKit 2 (via Superwall integration)
- **Model:** Hard paywall with 7-day free trial
- **Pricing:** ~$4.99/month or ~$29.99/year (final TBD)
- **Trial expiry behavior:** App locks after 7 days — paywall screen shown

### Store Compliance

- **App Store rating:** 4+ (no objectionable content, no user-generated content in MVP)
- **App Review considerations:** Subscription apps require clear disclosure of pricing, trial length, and renewal terms before purchase
- **Privacy:** No user data collected in MVP (no accounts, no analytics requiring consent beyond standard App Tracking Transparency)

### Implementation Considerations

- **1-week build target** constrains architecture to maximum simplicity
- No custom animations or complex UI patterns — clean, beautiful, but standard React Native components
- Superwall handles paywall complexity (UI, trial management, analytics)
- No backend, no API, no auth — ship fast, validate fast

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Revenue Validation MVP — the minimum product needed to test whether users will pay for a digital faith jar experience. Not a feature experiment, but a business model test.

**Core Principle:** Ship the smallest thing that validates the revenue hypothesis. Every feature that doesn't contribute to the paid funnel is scope creep.

**Resource Requirements:**
- 1 developer (Oleg) + Claude Code + BMAD framework
- 1 VA for verse database content (AI-assisted)
- Timeline: 1 week development, 2 weeks ad testing

### MVP Feature Set (Phase 1 — 1 week build)

**Core User Journeys Supported:**
- Journey 1 (Maria — comfort seeking): Fully supported
- Journey 2 (Grace — gratitude ritual): Fully supported
- Journey 3 (Alex — new user + paywall): Fully supported
- Journey 4 (Edge case — verse doesn't resonate): Fully supported via "another verse"

**Must-Have Capabilities:**

| Feature | Justification |
|---|---|
| 6 emotion categories | Core UX entry point |
| Bible verse display + explanation | Core value delivery — the reason users pay |
| "Another verse" button | Digital advantage, keeps users engaged until verse resonates |
| Curated verse database (~120 entries) | Content foundation — 20 verses per emotion with explanations |
| Hard paywall + 7-day free trial (Superwall) | Revenue validation mechanism |
| Offline-capable (bundled local DB) | Zero-friction experience, no network dependency |
| Minimal onboarding (no account) | Reduces friction to first value moment |

**Explicitly Out of MVP:**

| Feature | Why deferred |
|---|---|
| Favorites | Retention feature, not needed for revenue validation |
| Social sharing | Growth feature, not needed for revenue validation |
| Push notifications | Re-engagement, not needed for revenue validation |
| Prayer templates | Content-heavy, adds production time |
| User accounts | No personalization needed in MVP |
| Analytics beyond Superwall | Superwall + App Store Connect sufficient for MVP metrics |

### Phase 2 — MVP+ (if unit economics validate)

- Save to favorites — personal verse library
- Social sharing with designed verse cards — viral growth channel
- Prayer templates per verse — deepens spiritual practice
- Usage stats and day streaks — habit formation
- Push notifications / daily verse — re-engagement
- A/B testing paywall pricing via Superwall

### Phase 3 — V2+ (if strong engagement + user demand)

- AI verse interpretation (3 depth levels) — premium value, main differentiator
- User accounts / profiles — required for AI personalization
- Multiple Bible translations — broader audience
- Android version — market expansion via React Native
- Home screen widget — daily verse reminder

### Risk Mitigation Strategy

**Technical Risks:**

| Risk | Impact | Mitigation |
|---|---|---|
| Superwall + StoreKit integration complexity | Could extend 1-week timeline | Isolate paywall integration as separate task; use Superwall docs and templates |
| Verse database content quality | Poor explanations = poor user experience = low conversion | VA + AI workflow; review sample batch before full production |
| React Native performance | Jank on verse transitions hurts perceived quality | Keep UI simple — standard components, no complex animations |

**Market Risks:**

| Risk | Impact | Mitigation |
|---|---|---|
| Low trial-to-paid conversion | Business model doesn't work | Iterate paywall messaging/design via Superwall before killing the project |
| High CPI in faith/Christian niche | Unit economics don't work even with good conversion | Test multiple ad creatives and platforms; adjust targeting |
| Competitors improve | Competitive advantage narrows | Speed to market; unique "verse + explanation" angle |

**Resource Risks:**

| Risk | Impact | Mitigation |
|---|---|---|
| Content production slower than expected | Delays launch | Start VA on content immediately, parallel to development |
| 1-week dev timeline too tight | Delayed launch or cut corners | Superwall is the only integration risk; everything else is straightforward React Native |

## Functional Requirements

### Emotion Discovery

- **FR1:** User can view all available emotion categories on the main screen
- **FR2:** User can select an emotion category to receive a relevant Bible verse
- **FR3:** System presents 6 emotion categories: Anxiety, Sadness, Joy, Loneliness, Anger, Gratitude

### Verse Delivery

- **FR4:** User can view a Bible verse matched to the selected emotion
- **FR5:** User can view a brief explanation of why the displayed verse relates to the selected emotion
- **FR6:** User can request another verse for the same emotion without returning to the emotion selection screen
- **FR7:** System selects verses without immediate repetition within a session
- **FR8:** System provides a minimum of 15-20 unique verses per emotion category

### Subscription & Access Control

- **FR9:** New user can access the full app experience for a 7-day free trial period without payment
- **FR10:** System presents a paywall screen when the free trial expires
- **FR11:** User can purchase a monthly or annual subscription to continue using the app
- **FR12:** System locks all app functionality after trial expiry for non-subscribers
- **FR13:** System restores access immediately upon successful subscription purchase
- **FR14:** System validates subscription status on app launch

### Onboarding

- **FR15:** User can start using the app immediately without creating an account
- **FR16:** User can reach their first verse within 3 taps from first app launch
- **FR17:** System does not require any personal information to deliver the core experience

### App Foundation

- **FR18:** User can use the app without an internet connection (offline mode)
- **FR19:** System bundles the complete verse database locally within the app
- **FR20:** App launches and displays the main screen within acceptable load time

## Non-Functional Requirements

### Performance

- **NFR1:** App cold launch to main screen (emotion selection) within 2 seconds
- **NFR2:** Verse + explanation display after emotion tap within 500ms (local DB read)
- **NFR3:** "Another verse" loads a new verse within 300ms (no perceptible delay)
- **NFR4:** App size under 50 MB to minimize download friction

### Security

- **NFR5:** No user personal data collected or stored on device in MVP
- **NFR6:** Subscription transactions processed exclusively through StoreKit 2 (Apple-managed, PCI-compliant)
- **NFR7:** App complies with Apple App Transport Security requirements

### Accessibility

- **NFR8:** Minimum text size of 16pt for verse content to ensure readability
- **NFR9:** Sufficient color contrast ratios (WCAG AA minimum) for all text elements
- **NFR10:** VoiceOver support for core navigation (emotion selection → verse display)

### Integration

- **NFR11:** Superwall SDK initializes and presents paywall reliably on trial expiry
- **NFR12:** Subscription status syncs correctly between Superwall, StoreKit, and app state
- **NFR13:** App handles Superwall SDK unavailability gracefully (no crashes, fallback behavior)
