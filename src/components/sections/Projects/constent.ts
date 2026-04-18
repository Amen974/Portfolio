const jobTraker = 'Built a full-stack job application tracker from scratch, architecting the entire pipeline with React, TypeScript, and Supabase. Implemented secure authentication, full CRUD with status filtering, and a real-time dashboard featuring live stats and a donut chart with date filters — all powered by Supabase Realtime syncing changes instantly across pages.'
const chess = 'Built a fully functional chess game in React, engineering all game logic — move generation, validation, and endgame detection — completely separate from the UI layer. Integrated Stockfish AI via chess-api.com with 4 difficulty levels, and implemented a full game control suite including undo/redo, FEN import/export, move history navigation, and GSAP-powered piece animations.'

const technologies = {
  react:  'React',
  typescript: 'TypeScript',
  supabase: 'Supabase',
  tailwind: 'Tailwind',
  gsap: 'GSAP',
  stockfish:  'Stockfish',
}

export const projects = [
  {
    id: 1,
    title: 'job-tracker',
    number: '01',
    link: 'https://job-tracker-xi-ten.vercel.app/',
    img: '/Screenshot 2026-04-04 141826.png',
    year: '2026',
    role: 'Frontend developer + UI/UX designer',
    technologies: [
      technologies.react,
      technologies.typescript,
      technologies.supabase,
      technologies.tailwind,
    ],
    p: jobTraker
  },
  {
    id: 2,
    title: 'ReactChess',
    number: '02',
    link: 'https://chess-site-orpin.vercel.app/',
    img: '/Screenshot 2026-03-16 025836.png',
    year: '2025',
    role: 'Frontend developer',
    technologies: [
      technologies.react,
      technologies.typescript,
      technologies.gsap,
      technologies.stockfish,
    ],
    p: chess
  }
]
