const jwt = require("jsonwebtoken");
require("dotenv").config();

const authValidation = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token depuis l'en-tête Authorization

  if (!token) {
    res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocker les infos utilisateur dans `req.user`
    next(); // Passer au middleware suivant
  } catch (err) {
    res.status(403).json({ message: "Token invalide" });
  }
};

module.exports = authValidation;
