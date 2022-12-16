import React, { useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Modal from "../../../components/Modal";

interface ComentarioProps {
  id: Number;
  mensagem: String;
  users: {
    name: String;
    id: Number;
  };
}

interface DataProps {
  id: Number;
  title: String;
  mensagem: String;
  comentario: ComentarioProps[];
}

interface RespProps {
  data: {
    post: DataProps;
    ok: boolean;
  };
}
interface ReqResProps {
  req: NextApiRequest;
  res: NextApiResponse;
  resolvedUrl: String;
}

interface UserProps {
  data: null | { id: Number };
}

interface ComponentProps {
  postInfo: DataProps;
  userId: UserProps;
}

interface UserPostId {
  postId: Number;
  userId: Number | null;
}

export async function getServerSideProps({
  req,
  res,
  resolvedUrl,
}: ReqResProps) {
  console.log("entrou post id");
  const postId = resolvedUrl?.split("/")[3];
  const cookies = req.headers.cookie || "";
  const token = cookies.split("=")[1];
  // console.log(req.url);
  // console.log(resolvedUrl);
  const resp: RespProps = await axios.post(
    "http://localhost:5000/post",
    {
      postId,
    },
    {
      method: "POST",
    }
  );

  const userId: UserProps = await axios.post(
    "http://localhost:5000/get-userid",
    {
      token,
    },
    {
      withCredentials: true,
      method: "POST",
    }
  );

  if (resp.data.ok) {
    if (userId.data === null) {
      return {
        props: { data: { postInfo: resp.data.post, userId: null } },
      };
    }
    return {
      props: { data: { postInfo: resp.data.post, userId: userId.data.id } },
    };
  } else {
    return {
      props: {},
    };
  }
}

const Post = ({ data }: { data: ComponentProps }) => {
  console.log(data);
  // const [showUpdateField, setShowUpdateField] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentId, setCommentId] = useState<Number | null>(null);

  async function deleteComment(comentarioId: Number) {
    const resp: RespProps = await axios.delete(
      `http://localhost:5000/delete-comment/id?id=${comentarioId}`,
      {
        method: "DELETE",
      }
    );
  }

  async function updateComment(id: Number) {
    // console.log(id);
    setCommentId(id);
    setShowModal(true);
  }

  const userPostId: any = {
    postId: data.postInfo.id,
    userId: data.userId,
  };

  return (
    <div className="mt-24 px-40">
      <Modal
        userPostId={userPostId}
        commentId={commentId}
        setCommentId={setCommentId}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <div className="mb-12 text-center">
        <h2 className="title">{data.postInfo?.title.toUpperCase()}</h2>
        <p className="text-xl">{data.postInfo?.mensagem}</p>
      </div>

      <div className="px-2 text-right">
        <button className="btn w-40" onClick={() => setShowModal(true)}>
          Create Comment
        </button>
      </div>

      {data.postInfo?.comentario.length > 0 && (
        <div className="mb-2 border-b border-lineColor border-[0.2] p-2">
          {data.postInfo?.comentario.map((comentario: ComentarioProps) => {
            return (
              <div key={comentario.id.toString()}>
                <p className="text-lg">{comentario.mensagem}</p>
                <div className="flex items-center justify-end">
                  {comentario.users.id === data?.userId && (
                    <>
                      <button
                        className="ml-4 hover:underline"
                        onClick={() => updateComment(comentario.id)}
                      >
                        update
                      </button>

                      <button
                        className="ml-4 hover:underline"
                        onClick={() => deleteComment(comentario.id)}
                      >
                        delete
                      </button>
                    </>
                  )}
                  <p className="ml-8 text-right text-lg">
                    {comentario.users.name}
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Post;
