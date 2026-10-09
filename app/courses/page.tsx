import type { Metadata } from "next"
import { headers } from "next/headers"
import CoursesPage from "@/domain/courses"

export const metadata: Metadata = {
  title: "Courses & Fees",
  description: "Weekend Engineering and Media classes for Grades 8-11 in Lephalale, Limpopo. Monthly fees from R500, join any month, no experience needed.",
  alternates: { canonical: "/courses" },
}

export default async function Page() {
  const country = (await headers()).get("x-vercel-ip-country")
  return <CoursesPage country={country} />
}
