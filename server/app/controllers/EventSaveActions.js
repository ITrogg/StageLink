// Import access to database tables
const tables = require("../../database/tables");

const read = async (req, res, next) => {
  const { eventId, userId } = req.params;
  try {
    const eventStatus = await tables.EventSave.read(eventId, userId);

    if (!eventStatus) {
      res.status(404).json({ message: "événement non sauvegardé" });
    }
    res.status(200).json(eventStatus);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { eventId, userId } = req.params;
  const { status } = req.body;
  try {
    const rowsAffected = await tables.EventSave.update(eventId, userId, status);
    res.status(200).json(rowsAffected);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const eventSave = await tables.EventSave.create(req.body);
    res.status(201).json(eventSave);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { userId, eventId } = req.params;
  try {
    const rowsAffected = await tables.EventSave.delete(eventId, userId);
    res.status(200).json(rowsAffected);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  // browse,
  read,
  edit,
  add,
  destroy,
};
