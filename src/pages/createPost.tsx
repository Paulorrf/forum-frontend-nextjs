import React from "react";
import { parseCookies } from "nookies";
import validateToken from "../utils/validateToken";

const createPost = () => {
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const titulo = (event?.target as any).titulo.value;
    const mensagem = (event?.target as any).mensagem.value;
    const category = (event?.target as any).category.value;

    const cookies = parseCookies();

    const userInfo: any = validateToken(cookies.tk);

    if (!userInfo || !userInfo.email) {
      return;
    }

    const email = userInfo.email;

    const data = {
      title: titulo,
      mensagem,
      email,
      category: category.toLowerCase(),
    };

    const resp = await fetch("/api/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const data2 = await resp.json();
  };

  return (
    <div className="text-black">
      <h2>createPost</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose a category:</label>
          <select name="category">
            <option>General Discussion</option>
            <option>Lore </option>
            <option>Off-Topic</option>
            <option>News</option>
          </select>
        </div>

        <div>
          <input type="text" name="titulo" placeholder="titulo" />
        </div>
        <div>
          <input type="text" name="mensagem" placeholder="mensagem" />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default createPost;
