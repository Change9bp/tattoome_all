const validator = require("validator");

const validatorUserCreator = (req, res, next) => {
  const errors = [];

  const {
    name,
    lastName,
    email,
    password,
    alias,
    avatar,
    tattooStyle,
    nation,
    region,
    city,
    address,
  } = req.body;

  /* #region  SEZIONE FUNZIONE DI VERIFICA ESTENSIONE */
  const isImageURL = (avatar) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!validator.isURL(avatar)) {
      return false;
    }
    const fileExtension = avatar.substring(avatar.lastIndexOf("."));
    return allowedExtensions.includes(fileExtension.toLowerCase());
  };

  /* #endregion */

  /* #region  SEZIONE DI VALIDAZIONE CONTENUTO */
  if (name && typeof name !== "string") {
    errors.push("Name must be a non-empty string");
  }
  if (lastName && typeof lastName !== "string") {
    errors.push("Last name must be a non-empty string");
  }
  if (password && typeof password !== "string") {
    errors.push("Password must be a non-empty string");
  }
  if (email && !validator.isEmail(email)) {
    errors.push("Email must be a valid email address");
  }
  if (alias && typeof alias !== "string") {
    errors.push("Alias must be a non-empty string");
  }

  if (avatar && !isImageURL(avatar)) {
    errors.push("Avatar must contain a correct image format");
  }

  if (tattooStyle && !Array.isArray(tattooStyle)) {
    errors.push("Tattoo styles must be an array with data");
  }

  if (nation && typeof nation !== "string") {
    errors.push("Nation must be a non-empty string");
  }
  if (region && typeof region !== "string") {
    errors.push("Region must be a non-empty string");
  }
  if (city && typeof city !== "string") {
    errors.push("City must be a non-empty string");
  }
  if (address && typeof address !== "string") {
    errors.push("Address must be a non-empty string");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  /* #endregion */

  next();
};

module.exports = validatorUserCreator;
