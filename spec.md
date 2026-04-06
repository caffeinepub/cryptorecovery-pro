# CryptoRecovery Pro

## Current State
Full-stack Bitcoin recovery services website with:
- Landing page: Hero, Stats, Services, Pricing, How It Works, Testimonials, FAQ, Contact Form
- Backend: Motoko with RecoveryRequest, ServiceListing, Testimonial management, authorization
- Admin panel at /admin with username/password login (CryptoRecovery2025 / Admin@2025)
- Pricing: Basic $450 / Advanced $2500, BTC + USDT wallet copy buttons
- Dark luxury theme: Playfair Display + Plus Jakarta Sans, gold OKLCH accents
- No Privacy Policy, Terms & Conditions pages
- No live chat feature
- Contact section is a simple form — no payment flow feel

## Requested Changes (Diff)

### Add
- **Crypto Payment Gateway section**: After plan selection, show a proper payment flow UI — invoice-style with amount, wallet QR-code placeholder, countdown timer, copy address button, and "I've Sent Payment" confirmation button. Should feel like a real crypto checkout, not just wallet addresses on a card.
- **Live Chat Widget**: Floating chat bubble (bottom-right corner). Opens a chat panel where visitors can type messages. Admin sees all messages in admin panel with ability to reply. Store messages in backend (ChatMessage type). Real-time feel via polling.
- **Privacy Policy page**: Full-page route /privacy with proper legal content covering data collection, usage, cookies, third parties, contact info.
- **Terms & Conditions page**: Full-page route /terms with comprehensive terms covering services, payments, refunds, liability, disclaimers.
- **Footer links**: Make Privacy Policy and Terms & Conditions links in footer navigate to those pages.

### Modify
- **Contact Section**: Add a payment step after form submission — show crypto payment instructions with timer (15 minutes), wallet address + copy, amount breakdown, confirmation button.
- **PricingSection**: Keep existing but clicking "Get Started" should scroll to contact form AND pre-select the plan.
- **Header**: Add Privacy Policy / Terms links visible in footer nav (not header).
- **Admin Panel**: Add a "Live Chat" tab showing all visitor messages, allow admin to reply to each conversation.
- **Fonts**: Upgrade to Inter for body text (more modern/professional than Plus Jakarta Sans) while keeping Playfair Display for headings.
- **Overall design**: Make it feel more premium — tighter spacing, better card shadows, more professional typography hierarchy.

### Remove
- Nothing removed, only additions and improvements.

## Implementation Plan
1. Update backend Motoko to add ChatMessage type with sendMessage, getMessages, adminReply, getAllChats functions.
2. Regenerate backend.d.ts bindings.
3. Update frontend:
   a. Add pages: PrivacyPolicyPage, TermsPage
   b. Update App.tsx routing for /privacy, /terms
   c. Create LiveChatWidget component (floating bubble + chat panel)
   d. Update ContactSection with payment step (invoice UI after form submit)
   e. Update Footer to link Privacy/Terms to pages
   f. Update Admin panel with Chat tab
   g. Improve font to Inter for body
   h. Polish overall design quality
