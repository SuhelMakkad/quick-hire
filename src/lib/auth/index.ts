import { serialize } from "cookie";
import { encodeJWT } from "./jwt";

export const getAuthToken = async (username: string, role: string) => {
  const validityInDays = 1;
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * validityInDays;

  const claim = {
    exp: exp,
    username,
    role,
  };

  const token = await encodeJWT(claim, exp);

  const serialized = serialize("JWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: exp,
    path: "/",
  });

  return serialized;
};
