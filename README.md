# Smart Home & Ceremony Decoration Booking System

## Purpose

StyleDecor is a responsive booking experience for a Dhaka-based decoration studio. Visitors can explore home, wedding, celebration, and office styling services, view service details, and submit booking requests after signing in.

# Live Link:
[Demo](https://smart-home-da7f4.firebaseapp.com/)

Not deployed yet. Add the production client URL here after deployment.

## Key features

- Responsive home page with animated hero, service cards, decorator profiles, and coverage map.
- Service search and category filters, with public service detail pages.
- Firebase email/password registration and login, plus Google sign-in.
- Firestore-backed booking requests that appear across devices, with cancellation.
- Booking form with signed-in customer details, date, location, and service mode.
- Toast notifications, loading feedback, accessible focus states, and a custom not-found page.
- Tailwind CSS, DaisyUI components, Lucide React icons, and responsive layouts.
- Firebase configuration is read from Vite environment variables; local `.env` files are ignored by Git.
- Pages, shared components, and auth/booking features are organized into separate folders.

## Getting started

1. Install dependencies with `npm install`.
2. In Firebase Authentication, enable Email/Password and Google providers and add your development/production domains to **Authorized domains**.
3. Create a Firestore database in the Firebase console and publish the rules from [`firestore.rules`](./firestore.rules).
4. Restart the Vite server after changing `.env`, then run `npm run dev`.

The client uses Firebase Authentication for identity and Cloud Firestore for booking persistence. Booking documents are scoped to the signed-in owner's UID by the included Firestore rules. The service catalog and decorator profiles are demo data in `src/data.js`. Role-based admin/decorator dashboards and payment processing are not included.

## NPM packages

### Runtime dependencies

- `@tailwindcss/vite`
- `firebase`
- `framer-motion`
- `leaflet`
- `lucide-react`
- `react`
- `react-dom`
- `react-leaflet`
- `react-router`
- `react-toastify`
- `tailwindcss`

### Development dependencies

- `@eslint/js`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react`
- `daisyui`
- `eslint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `vite`

