import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import type { NextApiRequest, NextApiResponse } from "next";
import React from "react";

interface PostsProps {
  id: Number;
  title: String;
  mensagem: String;
  users_id: Number;
  category_id: Number;
}

export async function getServerSideProps({
  req,
  res,
  resolvedUrl,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
  resolvedUrl: String;
}) {
  const urlName = resolvedUrl.split("/")[2];

  const resp: any = await axios.post(
    "http://localhost:5000/last-posts",
    { urlName },
    {
      withCredentials: true,
      method: "POST",
    }
  );

  return {
    props: {
      posts: resp.data.lastPosts,
    },
  };
}

function capitalizeFirst(words: Array<String>) {
  return words.map((word) => {
    return word.toUpperCase() + " ";
  });
}

const Post = ({ posts }: { posts: Array<PostsProps> }) => {
  const router = useRouter();

  const title = capitalizeFirst(String(router.query.id)?.split("-"));

  // console.log(router.asPath);

  return (
    <div className="mt-24 px-40">
      <h2 className="title mb-4 text-center">{title}</h2>
      {posts.map((post: PostsProps) => {
        return (
          <div
            key={post.id.toString()}
            className="mb-0 overflow-x-hidden border-b border-lineColor border-[0.2] p-2"
          >
            <div className="max-w-md cursor-pointer hover:underline">
              <Link href={`${router.asPath}/${post.id}`}>
                <p className="text-2xl">{post?.title}</p>
              </Link>
            </div>
            <p className=" text-xl">{post?.mensagem}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
