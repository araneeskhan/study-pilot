export const siteConfig = {
  name: "Study Pilot",
  description:
    "Your comprehensive guide to studying abroad. Find universities, scholarships, programs, and get expert consultation for your international education journey.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/studypilot",
    facebook: "https://facebook.com/studypilot",
    instagram: "https://instagram.com/studypilot",
    linkedin: "https://linkedin.com/company/studypilot",
  },
  keywords: [
    "study abroad",
    "international education",
    "scholarships",
    "universities",
    "student visa",
    "admission requirements",
    "education consultancy",
  ],
};

export const adminConfig = {
  path: process.env.NEXT_PUBLIC_ADMIN_PATH || "x-control-panel-2024",
};