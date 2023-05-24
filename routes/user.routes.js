const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user/:id", [authJwt.verifyToken], controller.userBoard);

  app.get("/api/text/user/updateExpireday/:id", [
    authJwt.verifyToken,
    controller.updateExpireDay
  ]);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Create a new Tutorial
  app.post("/api/create", controller.create);

  // Retrieve all Tutorials
  app.get("/api/all", controller.findAll);

  // Update a Tutorial with id
  app.put("/api/update/:id", controller.update);

  // Delete a Tutorial with id
  app.delete("/api/delete/:id", controller.delete);
};
