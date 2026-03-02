# Story 1.2: EAS Build & Superwall Integration

Status: ready-for-dev

## Story

As a developer,
I want to configure EAS Build and integrate Superwall SDK,
So that the app runs on a physical device with paywall functionality validated.

## Acceptance Criteria

1. **Given** the Expo project from Story 1.1 exists
   **When** `eas.json` is configured with development and production profiles
   **Then** `eas build --profile development --platform ios` creates a Development Build

2. **And** the Development Build installs and launches on a physical iOS device

3. **And** `SuperwallProvider` wraps the app in `_layout.tsx`

4. **And** a test Superwall placement triggers and shows a paywall screen

5. **And** the app does not crash if Superwall fails to initialize (graceful degradation)

6. **And** FR20 is validated: app launches and displays a screen within 2 seconds

## Tasks / Subtasks

- [ ] Task 1: Create eas.json with development + production profiles (AC: #1)
- [ ] Task 2: Add SuperwallProvider to _layout.tsx (AC: #3)
- [ ] Task 3: Add Superwall placement registration logic (AC: #4)
- [ ] Task 4: Implement graceful degradation for Superwall (AC: #5)
- [ ] Task 5: Run EAS development build (AC: #1, #2) — REQUIRES USER
- [ ] Task 6: Test on physical device (AC: #2, #4, #6) — REQUIRES USER

## Dev Notes

### Superwall API Key

User must provide their Superwall API key. Use placeholder `'YOUR_SUPERWALL_API_KEY'` in code — user replaces before build.

### What the Dev Agent Can Do vs What Requires User

**Dev agent implements:** eas.json, SuperwallProvider in _layout.tsx, placement logic, graceful degradation
**User must do:** `eas build` (requires Apple credentials), device testing, Superwall dashboard setup

### References

- [Source: architecture.md#Infrastructure & Deployment] — EAS Build profiles
- [Source: architecture.md#Frontend Architecture] — Navigation flow, SuperwallProvider
- [Source: architecture.md#Error Handling Patterns] — Superwall graceful degradation
- [Source: epics.md#Story 1.2] — Acceptance criteria

## Dev Agent Record

### Agent Model Used
### Completion Notes List
### Change Log

| Change | Date | Reason |
|---|---|---|
| Story created | 2026-03-02 | Initial creation — YOLO mode |
