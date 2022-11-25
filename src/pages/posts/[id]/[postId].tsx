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
}

const post = ({ data: { data } }: any) => {
  // console.log(data);
  return (
    <div>
      <div>
        <h2>{data.title}</h2>
        <p>{data.mensagem}</p>
      </div>

      <div>
        {data.comentario.map((comentario: ComentarioProps) => {
          return (
            <div key={comentario.id.toString()}>{comentario.mensagem}</div>
          );
        })}
      </div>
    </div>
  );
};

export default post;
