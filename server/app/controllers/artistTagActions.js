// Import access to database tables
const tables = require("../../database/tables");

const add = async (req, res, next) => {
  try {
    const tag = await tables.artistTag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { artistId, tagId } = req.query;

  try {
    const rowsAffected = await tables.artistTag.delete(artistId, tagId);
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
