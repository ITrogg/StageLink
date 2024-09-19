// Import access to database tables
const tables = require("../../database/tables");

const add = async (req, res, next) => {
  try {
    const insertId = await tables.eventArtist.create(req.body);
    res.status(201).json(insertId);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { eventId, artistId } = req.params;
  try {
    const rowsAffected = await tables.eventArtist.delete(eventId, artistId);
    res.status(200).json(rowsAffected);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  // browse,
  // read,
  // edit,
  add,
  destroy,
};
