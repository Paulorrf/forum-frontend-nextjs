import Link from "next/link";
import React, { useEffect } from "react";

const Posts = () => {
  return (
    <div className="center items-start child:mb-4">
      <div className="hover:underline">
        <Link href="/posts/general-discussion">General Discussion</Link>
      </div>
      <div className="hover:underline">
        <Link href="/posts/lore">Lore</Link>
      </div>
      <div className="hover:underline">
        <Link href="/posts/off-topic">Off-Topic</Link>
      </div>
      <div className="hover:underline">
        <Link href="/posts/news">News</Link>
      </div>
    </div>
  );
};

export default Posts;
