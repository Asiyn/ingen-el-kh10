import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KH10 elen har gått",
  description: "Sidan där vi från KH10 lägger in när elen har gått.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
