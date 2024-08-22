const jwt = require("jsonwebtoken");
// Import access to database tables
const tables = require("../../database/tables");

require("dotenv").config();

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

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT.SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ message: "connexion reussi", token });
  } catch (err) {
    next(err);
  }
};

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
