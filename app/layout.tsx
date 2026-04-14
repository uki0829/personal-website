import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zhang Hefeng — Data Analyst & Product Scientist",
  description:
    "Student at Cornell University bridging human-centered design and data analysis. Specializing in product analytics, ML, and data-driven decision making.",
  keywords: [
    "data analyst", "product analyst", "data scientist", "machine learning",
    "Python", "SQL", "A/B testing", "behavioral analytics", "Cornell", "Parsons",
  ],
  icons: {
    icon: [{ url: "/images/icon.jpg", type: "image/jpeg" }],
    shortcut: "/images/icon.jpg",
    apple: "/images/icon.jpg",
  },
  openGraph: {
    title: "Zhang Hefeng — Data Analyst & Product Scientist",
    description: "Let design guide our intuition, and data shape our decisions.",
    type: "website",
    images: [{ url: "/images/icon.jpg", width: 1200, height: 630, alt: "Zhang Hefeng — Data Analyst & Product Scientist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhang Hefeng — Data Analyst & Product Scientist",
    description: "Let design guide our intuition, and data shape our decisions.",
    images: ["/images/icon.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
