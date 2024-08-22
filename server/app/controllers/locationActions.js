// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const locations = await tables.Location.readAll();
    res.status(200).json(locations);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const location = await tables.Location.read(req.params.id);
    if (location == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(location);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const location = req.body;
    const newLocation = await tables.Location.create(location);
    res.status(201).json(newLocation);
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
