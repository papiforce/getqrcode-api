const UserModel = require("./users.model");
const BadgeModel = require("../badges/badges.model");
const logger = require("../config/logger");
const { httpError } = require("../utils");

const getAll = async (req) => {
  const { id, onlyActive, search, limit, page } = req.query;

  const users = await UserModel.find({
    ...(id && { _id: id }),
    ...(onlyActive && { isDelete: false }),
    ...(search && {
      $or: [{ username: { $regex: search } }, { email: { $regex: search } }],
    }),
  })
    .limit(limit)
    .skip(limit * page);

  logger.info(`${req.originalUrl} : 200 (GET)`);

  return users;
};

const updateUserProfile = async (req) => {
  const userId = req.params.userId;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new httpError(403, "Cet utilisateur n'existe pas");
  }

  const checkEmail = await UserModel.findOne({ email: user.email });
  const checkUsername = await UserModel.findOne({ username: user.username });

  if (checkEmail || checkUsername) {
    if (
      checkEmail.email !== user.email &&
      checkUsername.username !== user.username
    ) {
      throw new httpError(403, "Email et pseudo déjà utilisés");
    }

    if (checkEmail.email !== user.email && checkEmail) {
      throw new httpError(403, "Cette email est déjà utilisée");
    }

    if (checkUsername.username !== user.username && checkUsername) {
      throw new httpError(403, "Ce pseudo est déjà utilisée");
    }
  }

  const updatedUser = Object.assign(user, req.body);

  await updatedUser.save();

  logger.info(`${req.originalUrl} : 200 (PUT)`);

  return updatedUser;
};

const addBadge = async (req) => {
  const { id } = req.params;

  const user = await UserModel.findById(req.user._id);

  if (!user) throw new httpError(404, "Cet utilisateur n'existe pas");

  if (user.badges.includes(id))
    throw new httpError(404, "Vous possédez déjà ce badge");

  const badge = await BadgeModel.findById(id);

  if (!badge) throw new httpError(404, "Ce badge n'existe pas");

  const updatedUser = Object.assign(user, { badges: [...user.badges, id] });

  await updatedUser.save();

  logger.info(`${req.originalUrl} : 200 (PUT)`);

  return updatedUser;
};

const getBadges = async (req) => {
  const user = await UserModel.findById(req.user._id).populate("badges");

  if (!user) throw new httpError(404, "Cet utilisateur n'existe pas");

  const { badges } = user;

  const sanitizedBadges = badges.filter((badge) => badge.isDelete === false);

  return {
    _id: user._id,
    email: user.email,
    isDelete: user.isDelete,
    username: user.username,
    picture: user.picture,
    roles: user.roles,
    badges: sanitizedBadges,
  };
};

module.exports = {
  getAll,
  updateUserProfile,
  addBadge,
  getBadges,
};
