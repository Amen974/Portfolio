import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import type { Project } from "../Types"

const COLUMNS = "id, title, number, link, img, year, role, technologies, p"

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const load = async () => {
      if (!supabase) {
        if (active) {
          setError("Supabase is not configured.")
          setLoading(false)
        }
        return
      }

      const { data, error: queryError } = await supabase
        .from("projects")
        .select(COLUMNS)
        .order("number", { ascending: true })

      if (!active) return

      if (queryError) {
        setError(queryError.message)
      } else {
        setProjects((data ?? []) as Project[])
        setError(null)
      }
      setLoading(false)
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return { projects, loading, error }
}
