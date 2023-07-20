const { httpError } = require("../utils");
const bcrypt = require("bcryptjs");
const UserModel = require("../users/users.model");
const logger = require("../config/logger");
const jwt = require("jsonwebtoken");

const signUp = async (req) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  encryptedPassword = await bcrypt.hash(password, salt);

  const userDoc = UserModel({
    username: username,
    email: email,
    password: encryptedPassword,
  });

  await userDoc.save();

  logger.info(`${req.originalUrl} : 200`);

  return { isSignUp: true };
};

const check = async (req) => {
  const { username, email } = req.body;

  const userByUsername = await UserModel.findOne({ username });
  const userByEmail = await UserModel.findOne({ email });

  if (userByUsername && userByEmail) {
    throw new httpError(404, "Ce compte existe déjà");
  }

  if (userByUsername) {
    throw new httpError(404, "Ce pseudo est déjà pris");
  }

  if (userByEmail) {
    throw new httpError(404, "Cette email est déjà prise");
  }

  logger.info(`${req.originalUrl} : 200`);

  return { isFree: true };
};

const signIn = async (req) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email: email })
    .select("+password")
    .exec();

  if (!user) {
    throw new httpError(404, "Identifiants incorrects");
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    throw new httpError(404, "Identifiant ou mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);

  const { password, ...userData } = user;

  delete userData._doc.password;

  logger.info(`${req.originalUrl} : 200`);

  return {
    token,
    user: userData._doc,
    isLogged: true,
  };
};

const me = async (req) => {
  const userUpToDate = await UserModel.findById(req.user._id);

  logger.info(`${req.originalUrl} : 200`);

  return {
    user: userUpToDate,
    isLogged: true,
  };
};

module.exports = {
  signUp,
  check,
  signIn,
  me,
};
