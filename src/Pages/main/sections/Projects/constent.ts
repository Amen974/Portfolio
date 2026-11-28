const chess = 'Built a fully functional chess game in React, engineering all game logic — move generation, validation, and endgame detection — completely separate from the UI layer. Integrated Stockfish AI via chess-api.com with 4 difficulty levels, and implemented a full game control suite including undo/redo, FEN import/export, move history navigation, and GSAP-powered piece animations.'
const obsidian = 'Built a full-stack coffee lounge platform from scratch, architecting a public ordering/booking site and a separate real-time staff dashboard on Next.js, TypeScript, and Supabase. Implemented guest checkout and table reservations with zero login required, a layered auth system (middleware + Postgres RLS) securing the staff dashboard, and a live order/reservation feed powered by Supabase Realtime — plus a scroll-driven GSAP storefront and a draggable, corner-snapping cart button that doubles as a real-time status indicator.'

const technologies = {
  react:  'React',
  nextjs: 'Next.js',
  typescript: 'TypeScript',
  supabase: 'Supabase',
  tailwind: 'Tailwind',
  gsap: 'GSAP',
  stockfish:  'Stockfish',
}

export const projects = [
  {
    id: 1,
    title: 'ObsidianCoffeeLounge',
    number: '01',
    link: 'https://cofee-cyan.vercel.app/',
    img: 'https://zniibxdvdkkieetfdixp.supabase.co/storage/v1/object/public/project-images/coffeeSitePic.webp',
    year: '2026',
    role: 'Full-stack developer + UI/UX designer',
    technologies: [
      technologies.nextjs,
      technologies.typescript,
      technologies.supabase,
      technologies.tailwind,
      technologies.gsap,
    ],
    p: obsidian
  },
  {
    id: 2,
    title: 'ReactChess',
    number: '02',
    link: 'https://chess-site-orpin.vercel.app/',
    img: 'https://zniibxdvdkkieetfdixp.supabase.co/storage/v1/object/public/project-images/chessSitePic.png',
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