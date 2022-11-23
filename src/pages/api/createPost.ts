import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, mensagem, email, category } = req.body;

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  const categoryId = await prisma.category.findFirst({
    where: {
      name: category,
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
