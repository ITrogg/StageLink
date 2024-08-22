// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const artists = await tables.Artist.readAll();
    res.status(200).json(artists);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const artist = await tables.Artist.read(req.params.id);
    if (artist == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(artist);
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  // add,
  // destroy,
};
