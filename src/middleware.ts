import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "tk",
    // @ts-ignore
    password: process.env.SECRET_WORD,
    cookieOptions: {
      secure: false,
    },
  });

  // do anything with session here:
  // @ts-ignore
  const { user } = session;

  console.log("eae");

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  console.log("from middleware", { user });

  // demo:
  //   if (user?.email === undefined) {
  //     // unauthorized to see pages inside admin/
  //     return NextResponse.redirect(new URL("/login", req.url)); // redirect to /unauthorized page
  //   }

  //   return res;
};

export const config = {
  matcher: "/createPost",
};
