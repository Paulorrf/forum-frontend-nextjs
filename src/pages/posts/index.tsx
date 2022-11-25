import Link from "next/link";
import React, { useEffect } from "react";

const Posts = () => {
  return (
    <div>
      <div>
        <Link href="/posts/general-discussion">General Discussion</Link>
      </div>
      <div>
        <Link href="/posts/lore">Lore</Link>
      </div>
      <div>
        <Link href="/posts/off-topic">Off-Topic</Link>
      </div>
      <div>
        <Link href="/posts/news">News</Link>
      </div>
    </div>
  );
};

export default Posts;
