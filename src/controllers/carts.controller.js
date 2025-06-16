import { cartsRepository, productsRepository, ticketRepository } from "../repositories/repository.js";
import { v4 as uuidv4 } from "uuid";

export const purchaseCb = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsRepository.readById(cid);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const user = req.user;
    let total = 0;
    let productsWithoutStock = [];

    for (const item of cart.products) {
      const product = await productsRepository.readById(item.pid._id);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        total += product.price * item.quantity;
        await productsRepository.updateById(product._id, product);
      } else {
        productsWithoutStock.push(item);
      }
    }

    const ticket = await ticketRepository.createOne({
      code: uuidv4(),
      amount: total,
      purchaser: user.email,
    });

    // Limpiar productos comprados del carrito
    cart.products = productsWithoutStock;
    await cartsRepository.updateById(cid, cart);

    res.status(200).json({
      status: "success",
      ticket,
      productsWithoutStock
    });

  } catch (error) {
    next(error);
  }
};
