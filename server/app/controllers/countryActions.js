// Import access to database tables
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const countries = await tables.Country.readAll();
    res.status(200).json(countries);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { label } = req.body;
    const country = await tables.Country.create(label);
    res.status(201).json(country);
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
