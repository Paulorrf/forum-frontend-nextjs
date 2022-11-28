import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Context from "../context/context";

const Navbar = () => {
  const router = useRouter();

  const darkMode = useContext(Context);

  //highlight the active route with underline
  const activeRoute = router.pathname.split("/")[1];

  const changeDarkMode = () => {
    const changeModeFunction = darkMode[1];
    changeModeFunction((prev) => !prev);
  };

  return (
    <div>
      <ul className="flex justify-between px-24 pt-2">
        <li
          className={`hover:underline ${activeRoute == "" ? "underline" : ""}`}
        >
          <Link href="/">Home</Link>
        </li>
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
        <li
          className={`hover:underline ${
            activeRoute == "createPost" ? "underline" : ""
          }`}
        >
          <Link href="/createPost">Create Post</Link>
        </li>
        <li
          className={`hover:underline ${
            activeRoute == "posts" ? "underline" : ""
          }`}
        >
          <Link href="/posts">Posts</Link>
        </li>

        <li className="cursor-pointer" onClick={changeDarkMode}>
          change {darkMode[0] ? "dark" : "light"}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
