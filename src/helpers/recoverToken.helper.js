import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "coderSecret";

// Expira en 1 hora
export const createRecoveryToken = (data) => {
  return jwt.sign(data, SECRET, { expiresIn: "1h" });
};

// Verifica el token (lanza error si expiró o no es válido)
export const verifyRecoveryToken = (token) => {
  return jwt.verify(token, SECRET);
};
