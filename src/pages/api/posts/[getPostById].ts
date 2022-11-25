import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { getPostById } = req.query;
  // res.json({ message: getPostById });

  const posts = await prisma.category.findFirst({
    where: {
      name: getPostById?.toString(),
    },
    include: {
      post: true,
    },
  });

  res.json({ data: posts });
}
