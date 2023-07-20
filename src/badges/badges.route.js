const router = require("express").Router();
const controller = require("./badges.controller");
const { isLogged, isAdmin } = require("../middlewares");

router.post("/", isLogged, isAdmin, controller.addBadge);
router.get("/", controller.getAllBadges);
router.put("/:id", isLogged, isAdmin, controller.updateBadge);
router.delete("/:id", isLogged, isAdmin, controller.removeBadge);

module.exports = router;
