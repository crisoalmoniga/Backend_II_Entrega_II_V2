const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory": {
    console.log("memory connected");
    const {
      productsManager,
      cartsManager,
      usersManager,
      ticketManager
    } = await import("./memory/dao.memory.js");
    dao = { productsManager, cartsManager, usersManager, ticketManager };
    break;
  }

  case "fs": {
    console.log("fs connected");
    const {
      productsManager,
      cartsManager,
      usersManager,
      ticketManager
    } = await import("./fs/dao.fs.js");
    dao = { productsManager, cartsManager, usersManager, ticketManager };
    break;
  }

  default: {
    console.log("mongo database connected");
    const {
      productsManager,
      cartsManager,
      usersManager,
      ticketManager
    } = await import("./mongo/dao.mongo.js");
    dao = { productsManager, cartsManager, usersManager, ticketManager };
    break;
  }
}

const { productsManager, cartsManager, usersManager, ticketManager } = dao;
export { productsManager, cartsManager, usersManager, ticketManager };
export default dao;