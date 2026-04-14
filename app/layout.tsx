import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hefeng Zhang | Portfolio",
  description:
    "I'm Hefeng Zhang. My work focuses on bridging human-centered design with data analysis. I am currently pursuing a master’s degree in Information Science @ Cornell University.",
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
    title: "Hefeng Zhang | Portfolio",
    description: "Let design guide our intuition, and data shape our decisions.",
    type: "website",
    images: [{ url: "/images/icon.jpg", width: 1200, height: 630, alt: "Hefeng Zhang | Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hefeng Zhang | Portfolio",
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
