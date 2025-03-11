import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import Header from "@/components/header/Header";
import Home from "@/app/home/page"
import Footer from "@/components/footer/Footer";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import "@/styles/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
// import type { Metadata } from 'next'
 
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.',
// }

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};
export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Header />
        {/* {children}
        <Home /> */}
        {children}
        <Footer />
        {/* <TailwindIndicator /> */}
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            {/* <GoogleAnalytics />
            <BaiDuAnalytics /> */}
          </>
        )}
      </body>
    </html>
  );
}
