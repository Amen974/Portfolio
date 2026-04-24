# Portfolio — Amen Allah Arfaoui

A personal portfolio website built with React and TypeScript, featuring multi-step GSAP animations, a custom page transition system, and an AI-powered chat assistant.

🔗 **Live:** [portfolio-delta-eight-29.vercel.app](https://portfolio-delta-eight-29.vercel.app/)

---

## Highlights

- **GSAP Animation Sequences** — Multi-step entrance animations on the Hero section with staggered text, letter splitting, and choreographed element reveals
- **Robot Mascot** — An interactive SVG robot with idle, wave, move, and transition states. Eyes track the user's cursor in real time
- **Page Transitions** — Custom transition system using a shared robot animation that walks across the screen between routes
- **AI Chat Assistant** — Click the robot to open a full-screen chat panel powered by Gemini AI. The robot scales up and morphs into the chat background as a seamless transition. Multi-turn conversation with full context history
- **Custom Cursor** — Context-aware cursor that changes state based on hoverable elements

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Animations | GSAP + @gsap/react |
| AI | Google Gemini 2.0 Flash API |
| API Proxy | Vercel Edge Function |
| Routing | React Router v6 |
| Deployment | Vercel |

---

## Architecture

### Animation System
All GSAP animations use the `useGSAP` hook for proper React integration and cleanup. The Hero section runs a single coordinated timeline — text slides in, the robot scales up, letter-by-letter stagger animations fire, then a continuous rotation starts on the Claude logo.

### Robot Component
`Robot.tsx` is a self-contained animated SVG with four distinct states:
- `waveidle` — floats and waves on loop
- `Move` — walks with leg animation and eye shift
- `transition` — continuous walk loop used during page transitions

Eyes track the mouse cursor via `getBoundingClientRect` and `Math.atan2` angle calculation.

### Page Transition System
A `TransitionProvider` + `usePageTransition` hook manages transition state globally. When triggered, a `Transition` overlay mounts with the robot walking across the screen before the route changes.

### AI Chat
- User clicks the robot → GSAP scales it up while simultaneously animating the SVG fill from `#da7756` to `#0a0f1e`
- Once the robot covers the screen, the Chat panel mounts via a React portal
- Messages are sent to a Vercel edge function which proxies to the Gemini API — the key never touches the browser
- Full conversation history is maintained in React state and sent with every request for multi-turn context
- Responses are rendered with `react-markdown` for proper formatting

---

## Running Locally

### Prerequisites
- Node.js 18+
- A Gemini API key from [aistudio.google.com](https://aistudio.google.com)
- Vercel CLI

### Setup

```bash
git clone https://github.com/Amen974/Portfolio.git
cd Portfolio
npm install
```

Create a `.env` file in the root:

```env
GEMINI_API_KEY=your_key_here
```

Run with Vercel CLI (required for the edge function):

```bash
vercel dev
```

---

## Author

Built by **Amen Allah Arfaoui** — Frontend Developer based in Tunisia, open to junior roles and freelance work.

- GitHub: [github.com/Amen974](https://github.com/Amen974)
- Email: aamenallah593@gmail.com
- Upwork: [upwork.com/freelancers/~010740a1ca4a28c240](https://www.upwork.com/freelancers/~010740a1ca4a28c240)