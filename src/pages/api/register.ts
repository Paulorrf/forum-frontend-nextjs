// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";

import prisma from "../../utils/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  const salt = 10;

  bcrypt.hash(password, salt, async (err, hash) => {
    if (err) {
      res.status(400).json({ message: "email ja cadastrado" });
    } else {
      try {
        const user = await prisma.users.create({
          data: {
            name,
            email,
            password: hash,
          },
        });

        res.status(200).json({ message: "usuario registrado" });
      } catch (error) {
        res.status(400).json({ message: "usuario ja existe" });
      }
    }
  });

  //
}
