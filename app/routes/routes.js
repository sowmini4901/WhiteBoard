module.exports = app => {
    const users = require("../controllers/controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
    router.post("/login", users.login);
    app.use('/api/register', router);
};