import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { getCookie, deleteCookie } from "cookies-next";

const Navbar = () => {
  const router = useRouter();
  let cookieIsSet = getCookie("tk") ? true : false;
  // console.log(hasCookie);

  const darkModeAndCookie = useContext(Context);
  const [dark, setDark, hasCookie, setHasCookie] = darkModeAndCookie;

  useEffect(() => {
    setHasCookie(cookieIsSet);
  }, [cookieIsSet, setHasCookie]);

  //highlight the active route with underline
  const activeRoute = router.pathname.split("/")[1];

  const changeDarkMode = () => {
    setDark((prev) => !prev);
  };

  const userLogout = () => {
    deleteCookie("tk", { path: "/" });
    const changeHasCookie = darkModeAndCookie[3];
    changeHasCookie(false);
    router.push("/");
  };

  return (
    <div>
      <ul className="flex justify-between px-24 pt-2">
        <li
          className={`hover:underline ${activeRoute == "" ? "underline" : ""}`}
        >
          <Link href="/">Home</Link>
        </li>

        {!hasCookie && (
          <>
            <li
              className={`hover:underline ${
                activeRoute == "login" ? "underline" : ""
              }`}
            >
              <Link href="/login">Login</Link>
            </li>
            <li
              className={`hover:underline ${
                activeRoute == "register" ? "underline" : ""
              }`}
            >
              <Link href="/register">Register</Link>
            </li>
          </>
        )}

        {hasCookie && (
          <li
            className={`hover:underline ${
              activeRoute == "createPost" ? "underline" : ""
            }`}
          >
            <Link href="/createPost">Create Post</Link>
          </li>
        )}

        <li
          className={`hover:underline ${
            activeRoute == "posts" ? "underline" : ""
          }`}
        >
          <Link href="/posts">Posts</Link>
        </li>

        {hasCookie && (
          <li className="cursor-pointer hover:underline" onClick={userLogout}>
            Logout
          </li>
        )}

        <li className="cursor-pointer hover:underline" onClick={changeDarkMode}>
          change {dark ? "dark" : "light"}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
