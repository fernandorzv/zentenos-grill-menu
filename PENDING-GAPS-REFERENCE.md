# Pending Gaps Reference

Updated: 2026-07-10
Scope: Public GitHub menu now live. This file tracks remaining gaps and implementation references for next phases.

## Current Baseline

- Public menu is online through GitHub Pages.
- Runtime menu source is `public/menu-public.json`.
- CI and Pages workflows are active.

## Pending Gaps (Execution Order)

### Gap 4: Data Contract Hardening

Objective:
- Enforce strict validation for required public-menu fields.
- Add runtime guards before rendering menu payload.

Work items:
- Promote critical warnings to hard failures in validator.
- Validate IDs, category links, price integrity, required contact fields, and governance metadata.
- Fail safely in UI with a controlled error state.

Primary files:
- `scripts/validate-public-menu.mjs`
- `public/menu-public.json`
- `src/App.jsx`

### Gap 5: Content Versioning and Traceability

Objective:
- Track menu content versions and publishing timestamps.

Work items:
- Add `menuVersion` and `updatedAt` metadata in menu payload.
- Display version/date in UI footer.
- Ensure every release maps to a specific menu version + commit.

Primary files:
- `public/menu-public.json`
- `src/App.jsx`
- `src/components` (footer or equivalent)

### Gap 6: CI/CD Production Gates

Objective:
- Keep releases deterministic and merge-safe.

Work items:
- Keep validation/build/deploy checks required for main.
- Add branch protection requirement checklist.
- Verify workflow health after dependency/runtime changes.

Primary files:
- `.github/workflows/ci.yml`
- `.github/workflows/pages.yml`
- `package.json`

### Gap 7: QR Operational Tooling

Objective:
- Make table QR operations print-ready and maintainable.

Work items:
- Add print layout output and manifest packaging.
- Add table range lifecycle rules (activate/deactivate/rename).
- Keep generated assets outside tracked source.

Primary files:
- `scripts/qr-standard.json`
- `scripts/generate-table-qr.mjs`

### Gap 8: UX and Accessibility Pass

Objective:
- Improve clarity and usability on mobile and desktop.

Work items:
- Improve loading/error/retry states.
- Review semantics, contrast, heading structure, and focus states.
- Improve visual hierarchy while preserving performance.

Primary files:
- `src/App.jsx`
- `src/styles/App.css`
- `src/components/*.css`

### Gap 9: Content Operations Workflow

Objective:
- Define a safe non-technical update process.

Work items:
- Create a menu update checklist for approvals.
- Add release checklist before main deploy.
- Add rollback note for last known good menu version.

Primary files:
- `public/menu-public.json`
- `scripts/validate-public-menu.mjs`
- project docs

## Outside Orders Policy Reference (Pickup/Delivery No-Show Risk)

Applies to outside clients only (not in-table ordering).

### Core Rule

Outside orders must not go directly to kitchen preparation.

Required status flow:
- New
- Awaiting confirmation
- Confirmed
- In preparation
- Ready (pickup) or Out for delivery
- Completed or No-show / Failed delivery

### Confirmation and Payment Controls

- Require confirmation before prep starts.
- High-risk orders (first-time, high-value, heavy customization) should require partial or full prepayment.
- Repeat no-show customers move to prepaid-only policy.

### Pickup Rules

- Notify customer when order is nearly ready.
- Hold for a fixed grace window (example: 20-30 minutes).
- After grace window, mark no-show and close by policy.

### Delivery Rules

- Require valid address and reachable phone.
- Driver contact attempt required before failed-delivery status.
- Refund/fee behavior must be defined and shown at checkout.

### UX/Policy Visibility

Before order submission, show:
- Confirmation timeout
- Pickup hold window
- No-show/cancellation policy
- Refund policy

## Design Mini-Sprint (Start Point)

Goal: apply a small visual refinement to the live GitHub menu without changing core flow.

First pass scope:
- Stronger visual hierarchy for loading/error states.
- Improve container depth/atmosphere and readability.
- Keep mobile-first behavior and fast rendering.

Target files:
- `src/App.jsx`
- `src/styles/App.css`
