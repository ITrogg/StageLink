// Import access to database tables
const tables = require("../../database/tables");

// Ajout
const add = async (req, res, next) => {
  const user = req.body;
  try {
    const newUserId = await tables.User.create(user);
    res.status(201).json({ newUserId });
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
  // destroy,
};
