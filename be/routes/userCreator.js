const express = require("express");
const userCreator = express.Router();
const UserCreatorModel = require("../models/userCreatorModel");
const verifyToken = require("../middlewares/verifyToken");
const validatorUserCreator = require("../middlewares/validatorUserCreator");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Console } = require("console");
require("dotenv").config();

//MANCANO I VALIDATOR, VALIDATOR USER VALIDATOR VERIFYTOKEN

/* #region  SEZIONE CLOUDINARY */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tattoome/avatar",
    format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

userCreator.post(
  "/userCreator/cloudUpload",
  cloudUpload.single("avatar"),
  async (req, res) => {
    try {
      res.status(200).json({ avatar: req.file.path });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "internal server error",
      });
    }
  }
);

/* #endregion */

/* #region  SEZIONE ROTTE */

//GET

userCreator.get("/userCreator", verifyToken, async (req, res) => {
  const userCreators = await UserCreatorModel.find();
  try {
    res.status(200).send({
      statusCode: 200,
      userCreators,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Server internal error",
    });
  }
});

//GET SOLO CREATOR

userCreator.get("/userCreator/onlyCreator", verifyToken, async (req, res) => {
  const userCreators = await UserCreatorModel.find({ role: "creator" });
  try {
    res.status(200).send({
      statusCode: 200,
      userCreators,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Server internal error",
    });
  }
});

//GET BY ID

userCreator.get("/userCreator/:_id", verifyToken, async (req, res) => {
  const { _id } = req.params;

  const userCreator = await UserCreatorModel.findById(_id);

  if (!userCreator) {
    return res.status(404).send({
      statusCode: 404,
      message: "this user or creator does not exist",
    });
  }

  try {
    res.status(200).send({
      statusCode: 200,
      userCreator,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Server internal error",
    });
  }
});

// ROTTA CON QUERY RICERCA USER CREATOR

userCreator.post(
  "/userCreator/search",
  verifyToken,
  validatorUserCreator,
  async (req, res) => {
    try {
      // Estrai i parametri di ricerca dalla query
      const { region, city, tattooStyle } = req.body;

      // Costruisci la query Mongoose in base ai parametri ricevuti
      const query = {};

      if (region) {
        query.region = region;
      }

      if (city) {
        query.city = city;
      }

      if (tattooStyle && tattooStyle.length > 0) {
        query.tattooStyle = {
          $elemMatch: {
            value: { $in: tattooStyle.map((style) => style.value) },
          },
        };
      }

      console.log("la mia req", req.body);
      console.log("la mia req", query);
      // Esegui la query nel database
      const results = await UserCreatorModel.find(query);

      // Invia i risultati al frontend
      // res.json(results);
      res.status(200).send({
        statusCode: 200,
        results,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore nella query del database" });
    }
  }
);

// POST
userCreator.post(
  "/userCreator",
  verifyToken,
  validatorUserCreator,
  async (req, res) => {
    //imposto un lvl di criptazione 10
    const salt = await bcrypt.genSalt(10);
    //costante che cripta la password accetta due parametri, il primo cosa deve criptare ed il secondo con che metodo deve criptare
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserCreatorModel({
      name: req.body.name,
      lastName: req.body.lastName,
      alias: req.body.alias,
      email: req.body.email,
      password: hashedPassword, //passiamo la password criptata
    });
    try {
      const user = await newUser.save();

      res.status(200).send({
        statusCode: 200,
        message: "User saved successfully",
        payload: user,
      });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "Server internal error",
      });
    }
  }
);

//PATCH

userCreator.patch(
  "/userCreator/:_id",
  verifyToken,
  validatorUserCreator,
  async (req, res) => {
    const { _id } = req.params;

    const userExists = await UserCreatorModel.findById(_id);

    console.log("esiste l'autore??", userExists);

    if (!userExists) {
      return res.status(404).send({
        statusCode: 404,
        message: "user does not exists",
      });
    }

    try {
      const dataToUpdate = req.body;

      if (dataToUpdate.password) {
        const salt = await bcrypt.genSalt(10);
        //costante che cripta la password accetta due parametri, il primo cosa deve criptare ed il secondo con che metodo deve criptare
        dataToUpdate.password = await bcrypt.hash(req.body.password, salt);
      }

      const options = { new: true };

      const result = await UserCreatorModel.findByIdAndUpdate(
        _id,
        dataToUpdate,
        options
      );
      res.status(200).send({
        statusCode: 200,
        message: "User correctly updated to CREATOR!",
        result,
      });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "Server internal error",
        error: error,
      });
    }
  }
);

//PATCH PER AGGIUNGERE LIKE

userCreator.patch(
  "/userCreator/:creatorId/like/:likedUserId",
  verifyToken,
  async (req, res) => {
    console.log("Request received");
    const { creatorId, likedUserId } = req.params;

    const userExists = await UserCreatorModel.findById(likedUserId);

    if (!userExists) {
      return res.status(404).send({
        statusCode: 404,
        message: "User does not exist",
      });
    }

    const creator = await UserCreatorModel.findById(creatorId);
    console.log("ho trovato l'i del post?", creator);

    if (!creator) {
      return res.status(404).send({
        statusCode: 404,
        message: "creator not found",
      });
    }

    try {
      const userAlreadyLiked = creator.likes.some(
        (like) => like.user.toString() === likedUserId.toString()
      );
      console.log("l'iddell'utente c'è?", likedUserId);
      console.log("l'iddell'utente c'è?", likedUserId);
      console.log("il like c'è?", userAlreadyLiked);

      let updatedCreator;

      // Aggiungi "mi piace" solo se l'utente corrente non ha già messo "mi piace" togliolo se lo ha già messo
      if (!userAlreadyLiked) {
        updatedCreator = await UserCreatorModel.findByIdAndUpdate(
          creatorId,
          { $addToSet: { likes: { user: likedUserId } } },
          { new: true }
        );
      } else {
        updatedCreator = await UserCreatorModel.findByIdAndUpdate(
          creatorId,
          { $pull: { likes: { user: likedUserId } } },
          { new: true }
        );
      }

      res.status(200).send({
        statusCode: 200,
        message: "Like operation completed successfully",
        updatedCreator,
      });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "Server internal error",
        error: error,
      });
    }
  }
);

//PATCH CHE AGGIUNGE LE VIEWS AL CREATOR

userCreator.patch(
  "/userCreator/:userId/views",
  verifyToken,
  async (req, res) => {
    const { userId } = req.params;

    try {
      const userCreator = await UserCreatorModel.findByIdAndUpdate(
        userId,
        { $inc: { views: 1 } },
        { new: true }
      );

      if (!userCreator) {
        return res.status(404).json({ message: "creator not found" });
      }

      res.status(200).send({
        statusCode: 200,
        message: "add views to CREATOR!",
        userCreator,
      });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "Server internal error",
        error: error,
      });
    }
  }
);

//DELETE

userCreator.delete("/userCreator/:_id", verifyToken, async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  try {
    const userCreatorToDelete = await UserCreatorModel.findByIdAndDelete(_id);

    if (!userCreatorToDelete) {
      return res.status(404).send({
        statusCode: 404,
        message: "user or creator dosent exists or already deleted",
      });
    }

    // Rimuovi i post associati all'utente
    await Post.deleteMany({ author: userId });

    // Rimuovi i like associati all'utente
    await Like.deleteMany({ userId: userId });

    res.status(200).send({
      statusCode: 200,
      message: "author correctly deleted",
      userCreatorToDelete,
    });
  } catch (error) {}
  res.status(500).send({
    statusCode: 500,
    message: "Server internal error",
  });
});

/* #endregion */
module.exports = userCreator;
