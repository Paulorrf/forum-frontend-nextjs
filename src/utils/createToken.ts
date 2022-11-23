import jwt from "jsonwebtoken";

function createToken(payload: any) {
  // const secretKey = process.env.SECRET_WORD || "teste";
  const secretKey = "teste";
  const token = jwt.sign(payload, secretKey);

  return token;
}

export default createToken;
