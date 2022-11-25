import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;

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
