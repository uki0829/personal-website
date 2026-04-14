import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hefengzhang.com"),
  title: "Hefeng Zhang | Portfolio",
  description:
    "Hefeng Zhang — MS Information Science at Cornell. Data analyst bridging human-centered design and data. Specializing in product analytics, ML, and A/B testing.",
  keywords: [
    "Hefeng Zhang", "Zhang Hefeng", "data analyst", "product analyst", "data scientist",
    "machine learning", "Python", "SQL", "A/B testing", "behavioral analytics", "Cornell", "Parsons",
  ],
  alternates: {
    canonical: "https://hefengzhang.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/images/icon.jpg", type: "image/jpeg" }],
    shortcut: "/images/icon.jpg",
    apple: "/images/icon.jpg",
  },
  openGraph: {
    title: "Hefeng Zhang | Portfolio",
    description:
      "Data analyst and MS student at Cornell. Explore projects in product analytics, machine learning, and UI/UX design.",
    type: "website",
    url: "https://hefengzhang.com",
    siteName: "Hefeng Zhang",
    images: [{ url: "/images/icon.jpg", width: 1200, height: 630, alt: "Hefeng Zhang | Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hefeng Zhang | Portfolio",
    description:
      "Data analyst and MS student at Cornell. Explore projects in product analytics, machine learning, and UI/UX design.",
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
