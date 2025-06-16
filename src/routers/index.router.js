import RouterHelper from "../helpers/router.helper.js";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";
import recoverRouter from "./api/recover.router.js";

class IndexRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.use("/", viewsRouter);
    this.use("/api", apiRouter); // solo esto maneja todo lo de /api/*
  };
}


const indexRouter = new IndexRouter().getRouter();
export default indexRouter;