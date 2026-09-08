import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata = {
  title: "LegacyVault",
  description: "Digital legacy and emergency access planner"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}