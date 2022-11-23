import jwt from "jsonwebtoken";

interface DecodeProps {
  email: String;
}

function validateToken(token: any) {
  // let secretKey = process.env.SECRET_KEY || "teste";
  let secretKey = "teste";

  try {
    let decode = jwt.verify(token, secretKey);
    return decode;
  } catch (err) {
    console.log(err);
  }
}

export default validateToken;
