import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface ParamsProps {
  params: { id: String };
}

interface PostProps {
  category_id: Number;
  id: Number;
  mensagem: String;
  title: String;
  users_id: Number;
}

interface PostsProps {
  posts: {
    data: {
      id: Number;
      description: String;
      name: String;
      post: [PostProps];
      postquantity: null;
    };
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "general-discussion" } },
      { params: { id: "news" } },
      { params: { id: "lore" } },
      { params: { id: "off-topic" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: ParamsProps) {
  try {
    const data = { id: params.id };

    const resp = await fetch(`http://localhost:3000/api/posts/${data.id}`);

    return {
      props: { posts: await resp.json() },
    };
  } catch (error) {
    return {
      props: { post: { data: "ocorreu um erro" } },
    };
  }
}

function capitalizeFirst(words: Array<String>) {
  return words.map((word) => {
    return word.toUpperCase() + " ";
  });
}

const Post = ({ posts }: PostsProps) => {
  const router = useRouter();

  let title = capitalizeFirst(posts.data.name.split("-"));

  return (
    <div className="mt-24 px-40">
      <h2 className="title mb-4 text-center">{title}</h2>
      {posts.data.post.map((post: PostProps) => {
        return (
          <div
            key={post.id.toString()}
            className="mb-2 border-b border-lineColor border-[0.2] p-2"
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
