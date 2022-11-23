import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";

import prisma from "../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({ message: "user dont exist" });
  } else {
    bcrypt.compare(password, user?.password, function (err, result) {
      if (result) {
        res.status(200).json({ email });
      } else {
        res.status(400).json({ message: "wrong email or password" });
      }

      if (err) {
        res.status(400).json({ message: err });
      }
    });
  }
}
