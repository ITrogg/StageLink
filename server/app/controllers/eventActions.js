// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  const { type, locationId, artistId } = req.query;
  try {
    switch (type) {
      case "futurByLocation": {
        const events = await tables.Event.readFuturByLocation(locationId);
        res.status(200).json(events);
        break;
      }
      case "pastByLocation": {
        const events = await tables.Event.readPastByLocation(locationId);
        res.status(200).json(events);
        break;
      }
      case "futurByArtist": {
        const events = await tables.Event.readFuturByArtist(artistId);
        res.status(200).json(events);
        break;
      }
      case "pastByArtist": {
        const events = await tables.Event.readPastByArtist(artistId);
        res.status(200).json(events);
        break;
      }
      default: {
        const events = await tables.Event.readAll();
        res.status(200).json(events);
      }
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const event = await tables.Event.read(req.params.id);
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(event);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const event = req.body;
    const newEvent = await tables.Event.create(event);
    res.status(200).json(newEvent);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
