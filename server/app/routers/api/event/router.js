const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
} = require("../../../controllers/eventActions");
const validateEvent = require("../../../services/eventValidation");

router.get("/", browse);
router.get("/:id", read);
router.put("/:id", edit);
router.post("/", validateEvent, add);
/* ************************************************************************* */

module.exports = router;
