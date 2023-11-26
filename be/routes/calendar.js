const express = require("express");
const calendar = express.Router();
const UserCreatorModel = require("../models/userCreatorModel");
const CalendarModel = require("../models/calendarModel");
const verifyToken = require("../middlewares/verifyToken");
require("dotenv").config();

calendar.get("/calendar/:creatorId", verifyToken, async (req, res) => {
  try {
    const { creatorId } = req.params;

    // Cerca il calendario dell'utente in base all'ID
    const calendar = await CalendarModel.findOne({ creator: creatorId });

    if (!calendar) {
      return res.status(404).json({
        message: "Calendario non trovato per l'utente con ID fornito",
      });
    }

    res.status(200).send({
      statusCode: 200,
      calendar,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Errore durante la ricerca del calendario" });
  }
});

calendar.post("/calendar", verifyToken, async (req, res) => {
  const { creator, events } = req.body;

  // Crea un'istanza del modello Calendar
  const calendar = new CalendarModel({
    creator: creator,
    events: [events],
  });

  // Salva il calendario nel database
  try {
    await calendar.save();

    res.status(200).send({
      statusCode: 200,
      message: "post saved successfully",
      calendar,
    });
  } catch (error) {
    console.error(error); // Aggiungi questa riga per visualizzare l'errore nella console
    res.status(500).send({
      statusCode: 500,
      message: "Server internal error",
      error,
    });
  }
});

// calendar.patch("/calendar", verifyToken, async (req, res) => {
//   try {
//     const { creatorId } = req.body;

//     // Cerca il calendario dell'utente in base all'ID del creatore
//     const existingCalendar = await CalendarModel.findOne({
//       creator: creatorId,
//     });

//     if (!existingCalendar) {
//       return res
//         .status(404)
//         .json({ message: "Calendario non trovato per l'utente" });
//     }

//     // Aggiorna il calendario dell'utente con i dati forniti nella richiesta
//     const dataToUpdate = req.body;
//     const options = { new: true };
//     const updatedCalendar = await CalendarModel.findByIdAndUpdate(
//       existingCalendar._id, // Utilizza l'ID effettivo del calendario
//       dataToUpdate,
//       options
//     );

//     res.status(200).json({
//       statusCode: 200,
//       message: "Calendario aggiornato correttamente",
//       updatedCalendar,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       statusCode: 500,
//       message:
//         "Errore interno del server durante l'aggiornamento del calendario",
//       error,
//     });
//   }
// });

calendar.patch("/calendar", verifyToken, async (req, res) => {
  try {
    const { creator, events } = req.body;
    console.log("events del calendario patch", req.body);
    // Cerca il calendario dell'utente in base all'ID del creatore
    const existingCalendar = await CalendarModel.findOne({
      creator: creator,
    });

    if (!existingCalendar) {
      return res
        .status(404)
        .json({ message: "Calendario non trovato per l'utente" });
    }

    // Aggiorna solo l'array events
    existingCalendar.events.push(events);
    const calendar = await existingCalendar.save();

    res.status(200).json({
      statusCode: 200,
      message: "Calendario aggiornato correttamente",
      calendar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message:
        "Errore interno del server durante l'aggiornamento del calendario",
      error,
    });
  }
});
module.exports = calendar;
