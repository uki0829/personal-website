import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hefengzhang.com"),
  title: "Hefeng Zhang | Portfolio",
  description:
    "Hefeng Zhang — MPS Information Science at Cornell. Data analyst bridging human-centered design and data. Specializing in product analytics, ML, and A/B testing.",
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
    icon: [
      { url: "/favicon.ico", type: "any"},
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" }
    ],
    shortcut: "/favicon-48.png",
    apple: "/apple-touch-icon.png",
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className="text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
