import { usersRepository } from "../repositories/repository.js";
import { createRecoveryToken, verifyRecoveryToken } from "../helpers/recoverToken.helper.js";
import sendRecoveryEmail from "../helpers/sendRecoveryEmail.helper.js";
import { compareHash, createHash } from "../helpers/hash.helper.js";

// Paso 1 - Enviar link al correo
export const requestRecover = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersRepository.readBy({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = createRecoveryToken({ user_id: user._id });
    await sendRecoveryEmail(user.email, token);
    res.status(200).json({ message: "Recovery email sent" });
  } catch (error) {
    next(error);
  }
};

// Paso 2 - Mostrar formulario si el token es válido
export const showResetForm = async (req, res) => {
  const { token } = req.params;
  try {
    verifyRecoveryToken(token);
    res.render("reset-password", { token });
  } catch {
    res.status(403).send("Token inválido o expirado.");
  }
};

// Paso 3 - Cambiar la contraseña
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const { user_id } = verifyRecoveryToken(token);
    const user = await usersRepository.readById(user_id);
    const isSamePassword = compareHash(password, user.password);
    if (isSamePassword) {
      return res.status(400).send("La nueva contraseña no puede ser igual a la anterior.");
    }

    const newPassword = createHash(password);
    await usersRepository.updateById(user._id, { password: newPassword });

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};
