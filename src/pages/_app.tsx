import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Context from "../context/context";
import { useState } from "react";
import axios from "axios";
import { atom } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(true);
  const [hasCookie, setHasCookie] = useState(true);

  return (
    <Context.Provider value={[dark, setDark, hasCookie, setHasCookie]}>
      <div className={`${dark && "dark"}`}>
        <div className="h-full min-h-screen w-full overflow-x-hidden bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </div>
    </Context.Provider>
  );
}
