import type { MetadataRoute } from "next"
import { site } from "@/config/site"

// ponytail: static route list, add a line when a page is added.
const routes = ["", "/courses", "/curriculum", "/about", "/curriculum/module-1", "/curriculum/module-2", "/curriculum/module-3", "/curriculum/module-4"]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/curriculum/") ? 0.7 : 0.9,
  }))
}
