# Agent Guidelines & Active Modes

## Active Mode: Desktop & Mobile Locked (Tablet Focus Mode)
- **Status**: INACTIVE (Ended by user passkey "doraemon")
- **Rule**: Previously restricted edits strictly to tablet viewports. Full desktop, tablet, and mobile editing is now unlocked.
- **Desktop & Mobile Freeze**: Lifted. All viewport styling and layout modifications are now permitted.

## Active Mode: Mobile-Only Styling Locked
- **Status**: INACTIVE (Ended by user passkey "pikachu")
- **Rule**: Replaced by Tablet Focus Mode.

## Active Rule: Mobile Header Structure Locked
- **Status**: LOCKED
- **Rule**: On mobile viewports (< md), regardless of available horizontal space, the header bar MUST strictly contain ONLY three items:
  1. Menu toggle (`#nav-mobile-menu-toggle`)
  2. Login / Profile (`#nav-login-btn` or `#nav-account-btn`)
  3. Basket (`#nav-cart-btn`)
  All other items (Brand logo/text, Track Order, Club Tiers button, etc.) must NEVER appear on the mobile header bar and belong exclusively in the mobile navigation menu or desktop view.
