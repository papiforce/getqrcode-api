const router = require("express").Router();
const controller = require("./users.controller");
const isLogged = require("../middlewares/isLogged");

router.get("/", controller.getAllUsers);
router.put("/update/:userId", isLogged, controller.updateUserProfile);

module.exports = router;
