const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().max(255).required().messages({
      "string.base": `"Nom d'utilisateur" doit être un texte`,
      "string.max": `"Nom d'utilisateur" ne peut pas dépasser 255 caractères`,
      "any.required": `"Nom d'utilisateur" est requis`,
    }),
    email: Joi.string().email().max(255).required().messages({
      "string.base": `"Email" doit être un texte`,
      "string.email": `"Email" doit être une adresse email valide`,
      "string.max": `"Email" ne peut pas dépasser 255 caractères`,
      "any.required": `"Email" est requis`,
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": `"Mot de passe" doit être un texte`,
      "string.min": `"Mot de passe" doit avoir au moins 8 caractères`,
      "any.required": `"Mot de passe" est requis`,
    }),
    profile_image: Joi.string()
      .uri()
      .max(255)
      .optional()
      .default("default_profile_image_url")
      .messages({
        "string.base": `"Image de profil" doit être un texte`,
        "string.url": `"Image de profil" doit être une URL valide`,
        "string.max": `"Image de profil" ne peut pas dépasser 255 caractères`,
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }

  return next(); // Ajoute "return" ici pour s'assurer que la fonction retourne toujours quelque chose.
};

module.exports = validateUser;
