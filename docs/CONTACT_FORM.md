Contact Form Setup

This project’s Contact section supports sending messages without a custom backend by integrating with Formspree. You can also rely on a mailto fallback if you don’t want to use a service.

Steps (Formspree):
- Create a free form at https://formspree.io and copy your form ID (e.g., abcdwxyz)
- Create a `.env.local` file in the project root and set:

  VITE_FORMSPREE_ID=abcdwxyz

- Restart the dev server if it’s running.

Behavior:
- When `VITE_FORMSPREE_ID` is set, the app POSTs JSON to `https://formspree.io/f/<ID>` using `fetch` and shows a success/error state in the UI.
- When not set, the form falls back to opening your mail client via `mailto:` with a prefilled subject and body.
- A hidden honeypot input is included to reduce spam.

Testing locally:
- With the env var set, submit the form and look for the green success banner.
- Without the env var, submitting should open your default mail client.

