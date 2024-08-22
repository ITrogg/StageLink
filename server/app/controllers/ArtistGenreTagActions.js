// Import access to database tables
const tables = require("../../database/tables");

const add = async (req, res, next) => {
  try {
    const genreTag = await tables.ArtistGenreTag.create(req.body);
    res.status(201).json(genreTag);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.ArtistGenreTag.delete(req.params.id);
    res.status(200).json(result);
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
