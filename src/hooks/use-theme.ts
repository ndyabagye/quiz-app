// src/hooks/use-theme.ts
import { useEffect, useState } from "react"

export type Theme = "light" | "dark"

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const root = document.documentElement
    const initialTheme = localStorage.getItem("theme") as Theme || "light"
    setTheme(initialTheme)
    root.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const updateTheme = (newTheme: Theme) => {
    const root = document.documentElement
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    root.classList.toggle("dark", newTheme === "dark")
  }

  return { theme, setTheme: updateTheme }
}