import "./globals.css";
import { Providers } from "@/components/Providers";
import { Outfit } from "next/font/google"; // 🚀 Step 1: Import the font loader

// 🚀 Step 2: Configure the font variables
const brandFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-brand", // Creates a CSS variable we can hook into Tailwind
  display: "swap",
});

export const metadata = {
  title: "LegacyVault",
  description: "Digital legacy and emergency access planner"
};

export default function RootLayout({ children }) {
  return (
    // 🚀 Step 3: Apply the font variable utility to the html element
    <html lang="en" className={brandFont.variable}>
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
