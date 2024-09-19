// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  const { type, locationId, artistId, userId } = req.query;
  try {
    switch (type) {
      case "futurByLocation": {
        const events = await tables.event.readFuturByLocation(locationId);
        res.status(200).json(events);
        break;
      }
      case "pastByLocation": {
        const events = await tables.event.readPastByLocation(locationId);
        res.status(200).json(events);
        break;
      }
      case "futurByArtist": {
        const events = await tables.event.readFuturByArtist(artistId);
        res.status(200).json(events);
        break;
      }
      case "pastByArtist": {
        const events = await tables.event.readPastByArtist(artistId);
        res.status(200).json(events);
        break;
      }
      case "byUser": {
        const events = await tables.event.readbyUser(userId);
        res.status(200).json(events);
        break;
      }
      default: {
        const events = await tables.event.readAll();
        res.status(200).json(events);
      }
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const event = await tables.event.read(req.params.id);
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(event);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = req.body;
    const rowsAffected = await tables.event.update(eventId, event);

    if (rowsAffected === 0) {
      res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(rowsAffected);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const event = req.body;
    const newEvent = await tables.event.create(event);
    res.status(200).json(newEvent);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  // destroy,
};
