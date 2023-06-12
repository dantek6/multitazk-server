import env from "dotenv";
import jwt from "jsonwebtoken";

export function createAccessToken(
  payload: string | object | Buffer
): Promise<string> {
  env.config();
  const tokenSecret = process.env.TOKEN_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      tokenSecret!,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token!); // Asegurar que token no es undefined
      }
    );
  });
}
