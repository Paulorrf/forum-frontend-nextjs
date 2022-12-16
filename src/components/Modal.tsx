import axios from "axios";
import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import ReactDom from "react-dom";

const Modal = ({
  userPostId = null,
  commentId = null,
  setCommentId,
  showModal,
  setShowModal,
}: {
  userPostId?: { postId: Number; userId: Number | null } | null;
  commentId?: Number | null;
  setCommentId: Dispatch<SetStateAction<Number | null>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  //Each value is for each ModalPledge
  const [isBrowser, setIsBrowser] = useState(false);

  const modalRef = useRef();

  console.log(commentId);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setCommentId(null);
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // console.log("post", userPostId);
  // console.log("comment", commentId);

  async function createComment(event: React.SyntheticEvent) {
    event.preventDefault();
    const comment = (event?.target as any).comment.value;
    // setShowModal(false);

    try {
      if (commentId === null) {
        const resp: any = await axios.post(
          "http://localhost:5000/create-comment",
          {
            comment,
            post_id: userPostId?.postId,
            users_id: userPostId?.userId,
          },
          {
            method: "POST",
          }
        );
        console.log("comentario criado");
      } else {
        console.log("commentid nao é null mas entrou em create comment");
      }
    } catch (error) {
      console.log("erro ao criar o comentario");
    }

    console.log(comment);
  }

  async function updateComment(event: React.SyntheticEvent) {
    event.preventDefault();
    const comment = (event?.target as any).comment.value;

    try {
      if (commentId !== null) {
        const resp: any = await axios.put(
          "http://localhost:5000/update-comment",
          {
            comment_id: commentId,
            mensagem: comment,
          },
          {
            method: "PUT",
          }
        );

        console.log("comentario atualizado");
        setCommentId(null);
      } else {
        console.log("commentid é null mas entrou em update comment");
      }
    } catch (error) {
      console.log("erro ao atualizar o comentario");
    }

    // console.log(resp.data);
  }

  const modalContent = showModal ? (
    <div
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-bgModal bg-center"
      onClick={closeModal}
      //@ts-ignore
      ref={modalRef}
    >
      <div className="w-96 bg-[#fff]">
        <div className="w-46 z-100 h-96">
          <form
            onSubmit={() =>
              //@ts-ignore
              commentId === null ? createComment(event) : updateComment(event)
            }
          >
            <h2>{commentId === null ? "Create" : "Update"} Comment</h2>
            <textarea name="comment"></textarea>
            <button type="submit">
              {commentId === null ? "Create" : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      //@ts-ignore
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
