const CoffeeRoute = {
  "GET /": "CoffeeController.find",
  "GET /:id": "CoffeeController.findById",
  "POST /": "CoffeeController.store",
  "PUT /:id": "CoffeeController.update",
  "DELETE /:id": "CoffeeController.destroy",
};

module.exports = CoffeeRoute;
