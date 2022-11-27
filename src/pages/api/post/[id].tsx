import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;

  //get post title, mensagem; comentario mensagem, id; user name
  const posts = await prisma.post.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      mensagem: true,

      comentario: {
        select: {
          mensagem: true,
          id: true,

          users: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  //   where: {
  //     id: Number(id),
  //   },
  //   include: {
  //     comentario: {
  //       select: {
  //           mensagem:true,
  //           id:true
  //       }
  //     },
  //   },

  res.json({ data: posts });
}
