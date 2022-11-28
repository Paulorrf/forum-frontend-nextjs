import React from "react";

export async function getServerSideProps(context: any) {
  const resp = await fetch(
    `http://localhost:3000/api/post/${context.params.postId}`
  );

  return {
    props: { data: await resp.json() },
  };
}

interface DataProps {
  comentario: ComentarioProps[];
  id: Number;
  mensagem: String;
  title: String;
}

interface ComentarioProps {
  id: Number;
  mensagem: String;
  users: { name: String };
}

const post = ({ data: { data } }: any) => {
  return (
    <div className="mt-24 px-40">
      <div className="mb-12 text-center">
        <h2 className="title">{data.title.toUpperCase()}</h2>
        <p className="text-xl">{data.mensagem}</p>
      </div>

      {data.comentario.length > 0 && (
        <div className="mb-2 border-b border-lineColor border-[0.2] p-2">
          {data.comentario.map((comentario: ComentarioProps) => {
            return (
              <div key={comentario.id.toString()}>
                <p className="text-lg">{comentario.mensagem}</p>
                <p className="text-right text-sm">{comentario.users.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default post;
