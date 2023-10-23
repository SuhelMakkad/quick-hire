import { SignJWT, jwtVerify } from "jose";
import type { JWTPayload } from "jose";

const secret = process.env.SECRET;
const textEncodedSecret = new TextEncoder().encode(secret);
const iat = Math.floor(Date.now() / 1000);

export const encodeJWT = (payload: JWTPayload, exp = 3600) =>
  new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(textEncodedSecret);

export const verifyJWT = (token: string) => jwtVerify(token, textEncodedSecret);
