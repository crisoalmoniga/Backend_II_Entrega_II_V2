import RouterHelper from "../../helpers/router.helper.js";
import passport from "passport";
import { purchaseCb } from "../../controllers/carts.controller.js";

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.router.post(
      "/:cid/purchase",
      passport.authenticate("user", { session: false }),
      purchaseCb
    );
  };
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;
