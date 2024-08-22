// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const { type, artistId } = req.query;
    if (type === "byArtist") {
      const genreTags = await tables.GenreTag.readByArtist(artistId);
      res.status(200).json(genreTags);
    } else {
      const genreTags = await tables.GenreTag.readAll();
      res.status(200).json(genreTags);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { label } = req.body;
    const genreTag = await tables.GenreTag.create(label);
    res.status(201).json(genreTag);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  // read,
  // edit,
  add,
  // destroy,
};
