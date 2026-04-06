# CryptoRecovery Pro

## Current State
The site has a contact form (submitRequest) and a live chat widget (sendVisitorMessage). The `sendVisitorMessage` backend function is publicly accessible (no auth required), but `submitRequest` requires `#user` permission via AccessControl -- meaning only logged-in Internet Identity users can submit. Since visitors are anonymous and there is no login flow on the public site, form submissions fail with "Submission failed" and chat messages may fail too if the actor isn't ready.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `submitRequest` in `main.mo`: Remove the `#user` permission check so anonymous/public users can submit recovery requests (same pattern as `sendVisitorMessage`). Store a placeholder Principal or omit the caller tracking.
- Remove the `userRequests` map tracking by caller Principal (since anonymous callers all share the same principal), or keep it but skip the permission guard.

### Remove
- AccessControl permission check from `submitRequest`

## Implementation Plan
1. In `main.mo`, change `submitRequest` from `shared ({ caller })` to `shared` (or keep caller but remove the permission guard)
2. Remove `Runtime.trap("Unauthorized: Only users can submit requests")` check
3. Keep the rest of the logic the same -- just store requests without requiring login
4. Regenerate backend bindings
