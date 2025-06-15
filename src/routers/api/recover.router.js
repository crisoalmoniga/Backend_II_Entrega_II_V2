import { Router } from "express";
import { requestRecover, showResetForm, resetPassword } from "../../controllers/recover.controller.js";

const recoverRouter = Router();

// Paso 1 - Enviar email
recoverRouter.post("/", requestRecover);

// Paso 2 - Render del formulario
recoverRouter.get("/:token", showResetForm);

// Paso 3 - Recibir y guardar la nueva contraseña
recoverRouter.post("/:token", resetPassword);

export default recoverRouter;
