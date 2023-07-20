const BadgeModel = require("./badges.model");
const logger = require("../config/logger");
const { httpError } = require("../utils");

const getAll = async (req) => {
  const { id, onlyActive, search, limit, page } = req.query;

  const badges = await BadgeModel.find({
    ...(id && { _id: id }),
    ...(onlyActive && { isDelete: false }),
    ...(search && { name: { $regex: search, $options: "i" } }),
  })
    .limit(limit)
    .skip(limit * page);

  logger.info(`${req.originalUrl} : 200 (GET)`);

  return badges;
};

const add = async (req) => {
  const badge = await BadgeModel.findOne({ name: req.body.name });

  if (badge) throw new httpError(404, "Ce badge existe déjà");

  const badgeDoc = BadgeModel(req.body);

  await badgeDoc.save();

  logger.info(`${req.originalUrl} : 200 (POST)`);

  return { isSuccessful: true };
};

const update = async (req, res) => {
  const { id } = req.params;

  const badge = await BadgeModel.findById(id);

  if (!badge) throw new httpError(404, "Ce badge n'existe pas");

  const updatedBadge = Object.assign(badge, req.body);

  await updatedBadge.save();

  logger.info(`${req.originalUrl} : 200 (PUT)`);

  return updatedBadge;
};

const remove = async (req) => {
  const { id } = req.params;

  const badge = await BadgeModel.findById(id);

  if (!badge) throw new httpError(404, "Ce badge n'existe pas");

  const updatedBadge = Object.assign(badge, { isDelete: true });

  await updatedBadge.save();

  logger.info(`${req.originalUrl} : 200 (DELETE)`);

  return { isSuccessful: true };
};

module.exports = {
  getAll,
  add,
  update,
  remove,
};
