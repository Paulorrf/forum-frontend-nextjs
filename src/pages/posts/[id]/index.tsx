import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface ParamsProps {
  params: { id: String };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "general-discussion" } },
      { params: { id: "news" } },
      { params: { id: "lore" } },
      { params: { id: "off-topic" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }: ParamsProps) {
  try {
    const data = { id: params.id };
    // console.log(data.id);

    const resp = await fetch(`http://localhost:3000/api/posts/${data.id}`);

    return {
      // Passed to the page component as props
      props: { posts: await resp.json() },
    };
  } catch (error) {
    return {
      // Passed to the page component as props
      props: { post: { data: "ocorreu um erro" } },
    };
  }
}

const Post = ({ posts }: any) => {
  const router = useRouter();

  console.log();

  // console.log(posts.data.post);
  return (
    <div className="text-[#fff]">
      <h2>post</h2>
      {posts.data.post.map((post: any) => {
        return (
          <div key={post.id}>
            <Link href={`${router.asPath}/${post.id}`}>
              <p>{post?.title}</p>
            </Link>
            <p>{post?.mensagem}</p>
            <div>-----------</div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
