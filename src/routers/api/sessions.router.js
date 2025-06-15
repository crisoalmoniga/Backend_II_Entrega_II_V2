import passport from "passport";
import { Router } from "express";
import { createCb, readCb, destroyCb } from "../../controllers/sessions.controller.js";


const sessionsRouter = Router();

sessionsRouter.get("/create", createCb);
sessionsRouter.get(
  "/current",
  passport.authenticate("user", { session: false }),
  readCb
);
sessionsRouter.get("/destroy", destroyCb);

export default sessionsRouter;
