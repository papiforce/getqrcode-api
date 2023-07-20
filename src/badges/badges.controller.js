const { errorHandler } = require("../utils");
const badgeService = require("./badges.service");

const addBadge = errorHandler(async (req, res) => {
  const data = await badgeService.add(req);

  if (!data) return res.status(404).json({ error: "Une erreur est survenue" });

  return res.status(200).json(data);
});

const updateBadge = errorHandler(async (req, res) => {
  const data = await badgeService.update(req);

  if (!data) return res.status(404).json({ error: "Aucun badge" });

  return res.status(200).json(data);
});

const getAllBadges = errorHandler(async (req, res) => {
  const data = await badgeService.getAll(req);

  if (!data) return res.status(404).json({ error: "Aucun badge" });

  return res.status(200).json(data);
});

const removeBadge = errorHandler(async (req, res) => {
  const data = await badgeService.remove(req);

  if (!data) return res.status(404).json({ error: "Aucun badge" });

  return res.status(200).json(data);
});

module.exports = {
  addBadge,
  updateBadge,
  getAllBadges,
  removeBadge,
};
