const { errorHandler } = require("../utils");
const userService = require("./users.service");

const getAllUsers = errorHandler(async (req, res) => {
  const data = await userService.getAll(req);

  if (!data) return res.status(404).json({ error: "Aucun utilisateur" });

  return res.status(200).json(data);
});

const updateUserProfile = errorHandler(async (req, res) => {
  const data = await userService.updateUserProfile(req);

  if (!data) return res.status(404).json({ error: "Aucun utilisateur" });

  return res.status(200).json(data);
});

const addBadgeToUser = errorHandler(async (req, res) => {
  const data = await userService.addBadge(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const getUserBadges = errorHandler(async (req, res) => {
  const data = await userService.getBadges(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

module.exports = {
  getAllUsers,
  updateUserProfile,
  addBadgeToUser,
  getUserBadges,
};
