// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  const { type } = req.query;
  if (type === "forInput") {
    try {
      const locations = await tables.place.readForInput();
      res.status(200).json(locations);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const locations = await tables.place.readAll();
      res.status(200).json(locations);
    } catch (err) {
      next(err);
    }
  }
};

const read = async (req, res, next) => {
  try {
    const location = await tables.place.read(req.params.id);
    if (location == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(location);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const locationId = req.params.id;
    const location = req.body;
    const rowsAffected = await tables.place.update(locationId, location);

    if (rowsAffected === 0) {
      res.status(404).json({ message: "Location not found" });
    }

    res.status(200).json(rowsAffected);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const location = req.body;
    const newLocation = await tables.place.create(location);
    res.status(201).json(newLocation);
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
