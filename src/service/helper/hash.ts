import crypto, { randomBytes } from "crypto";

const iterator = 1000;
const delimeter = ";";
export class PasswordHandler{
  Hash(password: string) {
  let salt = randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(password, salt, iterator, 64, "sha256")
    .toString("hex");
  return [hash, delimeter, salt].join("");
}

  Verify(password: string, hashedPassword: string) {
  if (!hashedPassword) return false;

  const parts = hashedPassword.split(";");
  if (parts.length !== 2) return false;
  const [hash, salt] = parts;
  if (!salt || !hash) return false;
  let newHash = crypto
    .pbkdf2Sync(password, salt, iterator, 64, "sha256")
    .toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(newHash, "hex")
  );
}
}