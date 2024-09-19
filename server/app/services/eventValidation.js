const Joi = require("joi");

const validateEvent = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().min(Joi.ref("start_date")).optional(),
    start_time: Joi.string()
      .regex(/^\d{2}:\d{2}:\d{2}$/)
      .optional(),
    place_id: Joi.number().integer().required(),
    created_by: Joi.number().integer().required(),
    poster_image: Joi.string().max(255).optional(),
    price_prevent: Joi.number().precision(2).optional(),
    price_at_door: Joi.number().precision(2).optional(),
    facebook_link: Joi.string().uri().max(255).optional(),
    ticket_link: Joi.string().uri().max(255).optional(),
    is_free: Joi.boolean().default(false),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }

  return next();
};

module.exports = validateEvent;
