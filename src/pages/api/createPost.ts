import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, mensagem, email, category } = req.body;

  //only gets id
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  //only gets id
  const categoryId = await prisma.category.findFirst({
    where: {
      name: category,
    },
    select: {
      id: true,
    },
  });

  if (!user || !categoryId) {
    res.status(400).json({ message: "ocorreu um erro na criação do post" });
    return;
  }

  try {
    const createdUser = await prisma.post.create({
      data: {
        title,
        mensagem,
        users_id: user.id,
        category_id: categoryId.id,
      },
    });

    res.status(200).json({ message: "post criado" });
  } catch (error) {
    res.status(400).json({ message: "ocorreu um erro na criação do post" });
  }
}
