const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const UserModel = require("./users.model");
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
  const { username, description } = req.body;

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

  const updatedUser = Object.assign(user, { username, description });

  await updatedUser.save();

  logger.info(`${req.originalUrl} : 200 (PUT)`);

  return updatedUser;
};

module.exports = {
  getAll,
  updateUserProfile,
};
