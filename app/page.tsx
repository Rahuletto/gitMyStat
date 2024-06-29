/* eslint-disable @next/next/no-img-element */
"use client";

import Hero from "./home/Hero";
import Header from "./home/Header";
import dynamic from "next/dynamic";

const Config = dynamic(() => import("./home/Config"), {
  ssr: false,
});
const Theme = dynamic(() => import("./home/Themes"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Config />
        <Theme />
      </main>
    </>
  );
}
