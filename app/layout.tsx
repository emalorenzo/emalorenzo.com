import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { InitialLoader } from "~/components/initial-loader";

import { App } from "./app";

import { getPostsMetadata } from "~/lib/cms";

import "~/styles/global.scss";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  fallback: ["arial"],
});

const robotoMono = Roboto_Mono({
  weight: ["100", "400", "700"],
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

const mono = localFont({
  src: [
    {
      path: "../public/fonts/JetBrainsMono-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  fallback: ["arial"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPostsMetadata();
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${mono.variable} ${robotoMono.variable} font-sans touch-auto overflow-auto h-screen relative scrollbar`}
    >
      <body className="flex overflow-auto relative flex-col w-full h-screen">
        <App>{children}</App>
        <InitialLoader posts={posts} />
      </body>
    </html>
  );
}
