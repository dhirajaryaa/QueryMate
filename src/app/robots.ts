import { SiteUrl } from "@/lib/constant";
import type { MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login", "/new", "/connections/", "/chat/"],
      },
    ],
    sitemap: `${SiteUrl}/sitemap.xml`,
  };
}
