# Portfolio — Amen Allah Arfaoui

Personal portfolio for Amen Allah Arfaoui (frontend developer, Tunisia): a single-page site plus a chat page that answers questions about him.

🔗 **Live:** [portfolio-delta-eight-29.vercel.app](https://portfolio-delta-eight-29.vercel.app/)

## What's in it

- **Home page** — Hero, About (with a CSS skills marquee), Projects, Contact. All animated with GSAP.
- **Robot mascot** — an animated SVG with four states (`waveidle`, `Move`, `transition`, `non`) whose eyes follow the cursor.
- **Page transition** — clicking the robot plays a full-screen overlay where the robot walks across the screen, then the route changes.
- **Chat page** — `/Chat` renders a transcript and a composer. Messages go to `/api/chat`, which proxies Google Gemini with a system prompt built from the `profile` row (bio, skills, links) plus the `projects` table, so editing those rows changes the answers; answers are rendered as GitHub-flavoured Markdown.

## Stack

| Layer | Technology |
|---|---|
| Build | Vite 8 |
| UI | React 19 + TypeScript 5.9 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Animation | GSAP 3.14 + `@gsap/react` (`useGSAP`), `ScrollTrigger` |
| Routing | React Router v7 (`BrowserRouter`) |
| Markdown | `react-markdown` + `remark-gfm`, lazy-loaded with the `/Chat` route |
| AI | Google Gemini through `@google/genai` in a Vercel function (`api/chat.ts`) |
| Hosting | Vercel (SPA build + the API function) |

## Project layout

```
api/chat.ts                   Vercel function: Gemini proxy + system prompt
src/main.tsx                  React root (BrowserRouter)
src/App.tsx                   Routes "/" and "/Chat"; Chat is lazy-loaded
src/Pages/main/Main.tsx       Hero, About, Projects, Contact
src/Pages/Chat.tsx            Chat page (transcript, Markdown components, composer)
src/hooks/useChat.ts          Chat state + POST /api/chat
src/hooks/useProjects.ts      Projects query (Supabase)
src/TransitionProvider.tsx    Page transition state + triggerTransition
src/Transition.tsx            Full-screen robot walk overlay
src/components/Robot.tsx      Animated SVG robot
src/components/robot/store.ts Robot slot state (hero, projects, contact, transition)
src/lib/                      splitLetters, useMediaQuery, Supabase client
src/Pages/main/sections/Projects/constent.ts  Project data (fallback; images are Supabase bucket URLs)
public/                       Mussels font
```

## Running locally

```bash
git clone https://github.com/Amen974/Portfolio.git
cd Portfolio
npm install
```

Create an untracked `.env` in the root:

```env
GEMINI_API_KEY=your_key_here
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_publishable_key
```

- `npm run dev` serves the site on Vite; the chat API does **not** run there.
- `vercel dev` runs the site and `api/chat.ts` together — use this to test the chat.
- `npm run build` (type check + build) and `npm run lint` are the checks.

## Deploying

Vercel builds the SPA and deploys `api/chat.ts`. `GEMINI_API_KEY` is set in the Vercel project settings and never reaches the browser. `vercel.json` keeps the `/api/*` passthrough and the SPA rewrite. The function also reads the same `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` at runtime to load the project list.

## Author

Amen Allah Arfaoui — frontend developer based in Tunisia, open to junior roles and freelance work.

- GitHub: [github.com/Amen974](https://github.com/Amen974)
- Email: aamenallah593@gmail.com
- Upwork: [upwork.com/freelancers/~010740a1ca4a28c240](https://www.upwork.com/freelancers/~010740a1ca4a28c240)
