import { GoogleGenAI } from "@google/genai"

type ChatMessage = { role: "user" | "assistant"; content: string }
type ChatRequest = { method?: string; body: { messages?: ChatMessage[] } }
type ChatResponse = { status: (code: number) => { json: (body: unknown) => void } }

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const MY_INFO = `
You are an AI assistant embedded in Amen Allah Arfaoui's portfolio website. 
Your job is to answer questions about Amen clearly and concisely — like a 
knowledgeable assistant who knows him well.

== WHO IS AMEN ==
Name: {{NAME}}
Location: {{LOCATION}}
Languages: {{LANGUAGES}}
Education: {{EDUCATION}}
Experience: {{EXPERIENCE}}
What he does: {{SUMMARY}}

== OPEN TO ==
{{OPEN_TO}}

== CONTACT & LINKS ==
{{CONTACTS}}

== SKILLS ==
{{SKILLS}}

== PROJECTS ==
{{PROJECTS}}

== BEHAVIOR RULES ==
- Answer only about Amen, his skills, projects, and availability
- If asked something unrelated, politely redirect: "I'm here to answer 
  questions about Amen and his work."
- Keep answers short and direct unless the user asks for more detail
- If asked for contact info or links, always provide the actual URLs
- Never make up skills, projects, or experience Amen doesn't have
- Tone: professional but friendly
`

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY

type ProjectRow = {
  title: string
  year: string
  role: string
  link: string
  technologies: string[]
  p: string
}

type LinkRow = { label: string; url: string }

type ProfileRow = {
  name: string
  location: string
  languages: string[]
  education: string
  experience: string
  summary: string
  open_to: string[]
  skills: string[]
  links: LinkRow[]
}

const supabaseSelect = async <T,>(query: string): Promise<T> => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: { apikey: SUPABASE_KEY ?? "", Authorization: `Bearer ${SUPABASE_KEY ?? ""}` },
  })

  if (!res.ok) throw new Error(`Supabase returned ${res.status}`)

  return (await res.json()) as T
}

const loadProfile = async (): Promise<ProfileRow | null> => {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null

  const rows = await supabaseSelect<ProfileRow[]>(
    "profile?select=name,location,languages,education,experience,summary,open_to,skills,links&limit=1"
  )

  return rows[0] ?? null
}

const loadProjects = async (): Promise<ProjectRow[]> => {
  if (!SUPABASE_URL || !SUPABASE_KEY) return []

  return supabaseSelect<ProjectRow[]>(
    "projects?select=title,year,role,link,technologies,p&order=number.asc"
  )
}

const listBlock = (items: string[]) =>
  items.length === 0 ? "- none listed" : items.map((item) => `- ${item}`).join("\n")

const contactsBlock = (links: LinkRow[]) =>
  links.length === 0 ? "none listed" : links.map((link) => `${link.label}: ${link.url}`).join("\n")

const projectsBlock = (projects: ProjectRow[]) => {
  if (projects.length === 0) return "No projects are listed right now."

  return projects
    .map(
      (project, index) => `== PROJECT ${index + 1} — ${project.title} ==
Live: ${project.link}
Year: ${project.year} — Role: ${project.role}
${project.p}
Tech: ${project.technologies.join(", ")}`
    )
    .join("\n\n")
}

const buildSystemPrompt = (profile: ProfileRow, projects: ProjectRow[]) => {
  const values: Record<string, string> = {
    NAME: profile.name,
    LOCATION: profile.location,
    LANGUAGES: profile.languages.join(", "),
    EDUCATION: profile.education,
    EXPERIENCE: profile.experience,
    SUMMARY: profile.summary,
    OPEN_TO: listBlock(profile.open_to),
    CONTACTS: contactsBlock(profile.links),
    SKILLS: profile.skills.join(", "),
    PROJECTS: projectsBlock(projects),
  }

  return Object.entries(values).reduce(
    (prompt, [key, value]) => prompt.replace(`{{${key}}}`, () => value),
    MY_INFO
  )
}


export default async function handler(req: ChatRequest, res: ChatResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages } = req.body
  if (!messages) return res.status(400).json({ error: 'Missing messages' })

  let profile: ProfileRow | null = null
  try {
    profile = await loadProfile()
  } catch (error) {
    console.error("Supabase profile fetch failed:", error)
  }

  if (!profile) return res.status(503).json({ error: 'Profile unavailable' })

  let projects: ProjectRow[] = []
  try {
    projects = await loadProjects()
  } catch (error) {
    console.error("Supabase projects fetch failed:", error)
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      config: { systemInstruction: buildSystemPrompt(profile, projects), temperature: 0.2 }
    })

    res.status(200).json({ text: response.text })
  } catch (error) {
    console.error("Gemini error:", error)
    res.status(500).json({ error: 'Failed to generate response' })
  }
}