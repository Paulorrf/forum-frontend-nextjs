import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Context from "../context/context";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);

  return (
    <Context.Provider value={[dark, setDark]}>
      <div className={`${dark && "dark"}`}>
        <div className="dark:bg-bgDark bg-bgLight dark:text-textDark text-textLight h-screen w-screen">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </div>
    </Context.Provider>
  );
}
