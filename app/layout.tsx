import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Time Since",
  description: "",
  keywords: "Time Since, countdown, date, time",
  openGraph: {
    title: "Time Since",
    description: "",
    url: "",
    siteName: "Time Since",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://unpkg.com/@tailwindcss/browser@4"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
