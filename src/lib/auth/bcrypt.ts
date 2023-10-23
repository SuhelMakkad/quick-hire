import bcrypt from "bcrypt";

const saltRounds = 8;

export const generateHash = (plainText: string) => bcrypt.hash(plainText, saltRounds);

export const validateHash = (plainText: string, hash: string) => bcrypt.compare(plainText, hash);
