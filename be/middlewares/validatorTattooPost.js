const validator = require("validator");

const validatorTattooPost = (req, res, next) => {
  const errors = [];

  const { title, content, cover, tattooStyle } = req.body;

  /* #region  SEZIONE FUNZIONE DI VERIFICA ESTENSIONE */
  const isImageURL = (cover) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (typeof cover !== "string" || !validator.isURL(cover)) {
      return false;
    }
    const fileExtension = cover.substring(cover.lastIndexOf("."));
    return allowedExtensions.includes(fileExtension.toLowerCase());
  };
  /* #endregion */

  if (title && typeof title !== "string") {
    errors.push("Title must be a non-empty string");
  }

  if (content && typeof content !== "string") {
    errors.push("Content must be a non-empty string");
  }

  if (cover && !isImageURL(cover)) {
    errors.push("Cover must contain a correct image format");
  }

  if (tattooStyle && tattooStyle.length > 0 && !Array.isArray(tattooStyle)) {
    errors.push("Tattoo styles must be an array with data");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = validatorTattooPost;
