import {
  cartsManager,
  productsManager,
  usersManager,
  ticketManager
} from "../dao/factory.js";

import UsersDTO from "../dto/users.dto.js";
import ProductsDTO from "../dto/products.dto.js";
import CartsDTO from "../dto/carts.dto.js";

// Ticket no necesita DTO porque solo lo genera el backend
class Repository {
  constructor(manager, Dto = null) {
    this.manager = manager;
    this.Dto = Dto;
  }

  createOne = async (data) =>
    this.Dto ? this.manager.createOne(new this.Dto(data)) : this.manager.createOne(data);

  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  readBy = async (filter) => await this.manager.readBy(filter);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
}

const productsRepository = new Repository(productsManager, ProductsDTO);
const cartsRepository = new Repository(cartsManager, CartsDTO);
const usersRepository = new Repository(usersManager, UsersDTO);
const ticketRepository = new Repository(ticketManager); // sin DTO

export {
  productsRepository,
  cartsRepository,
  usersRepository,
  ticketRepository
};