import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Context from "../context/context";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);

  return (
    <Context.Provider value={[dark, setDark]}>
      <div
        className={`bg-[#0f0f0f] h-screen w-screen text-white ${
          dark && "dark"
        }`}
      >
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Context.Provider>
  );
}
