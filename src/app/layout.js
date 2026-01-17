import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Eco-Guide Assistant",
  description: "AI-powered Municipal Waste Policy Assistant",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} bg-[#f5f8f8] dark:bg-[#0f2320]`}>
        {children}
      </body>
    </html>
  );
}
