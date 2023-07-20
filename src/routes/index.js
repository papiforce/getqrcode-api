const router = require("express").Router();
const authRouter = require("../auth/auth.route");
const usersRouter = require("../users/users.route");
const badgesRouter = require("../badges/badges.route");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/badges", badgesRouter);

module.exports = router;
