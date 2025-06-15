import UserPublicDTO from "../dto/user.public.dto.js";

// /api/sessions/current
export const readCb = (req, res) => {
  const dto = new UserPublicDTO(req.user);
  res.status(200).json({ status: "success", user: dto });
};

// /api/sessions/create
const createCb = (req, res, next) => {
  try {
    req.session.role = "ADMIN";
    req.session.mode = "dark";
    const message = "Sessions vence en 7 dias";
    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

// /api/sessions/destroy
const destroyCb = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "Sessions eliminada";
    return res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export { createCb, destroyCb };