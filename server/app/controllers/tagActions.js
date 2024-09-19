// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const { type, artistId } = req.query;
    if (type === "byArtist") {
      const tags = await tables.tag.readByArtist(artistId);
      res.status(200).json(tags);
    } else {
      const tags = await tables.tag.readAll();
      res.status(200).json(tags);
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const tag = await tables.tag.read(req.params.id);
    res.status(200).json(tag);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { label } = req.body;
    const tag = await tables.tag.create(label);
    res.status(201).json(tag);
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
