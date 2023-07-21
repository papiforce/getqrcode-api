const router = require("express").Router();
const controller = require("./users.controller");
const isLogged = require("../middlewares/isLogged");

router.get("/", controller.getAllUsers);
router.get("/badges", isLogged, controller.getUserBadges);
router.put("/update/:userId", isLogged, controller.updateUserProfile);
router.put("/badge/:id", isLogged, controller.addBadgeToUser);

module.exports = router;
