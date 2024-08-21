// Import access to database tables
const tables = require("../../database/tables");

const read = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await tables.User.readByEmail(email);

    if (!user) {
      res.status(404).json({ message: "Utilisateur·ice non trouvé·e" });
    }

    if (user.password !== password) {
      res.status(401).json({ message: "Mot de passe incorrect" });
    }
    res.status(200).json({ message: "connexion reussi", user });
  } catch (err) {
    next(err);
  }
};

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
  read,
  // edit,
  add,
  // destroy,
};
