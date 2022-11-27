import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";

import prisma from "../../utils/prismaClient";

import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    // get user from database then:
    if (!user) {
      res.status(400).json({ message: "user dont exist" });
    } else {
      bcrypt.compare(password, user?.password, async function (err, result) {
        if (result) {
          // @ts-ignore
          req.session.user = {
            email: email,
          };
          await req.session.save();
          res.send({ ok: true });
        } else {
          res.send({ ok: false });
        }

        if (err) {
          res.status(400).json({ message: err });
        }
      });
    }
  },
  {
    cookieName: "tk",
    // @ts-ignore
    password: process.env.SECRET_WORD,
    cookieOptions: {
      secure: false,
    },
  }
);
