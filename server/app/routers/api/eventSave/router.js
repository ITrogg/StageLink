const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/EventSaveActions");

router.get("/:userId/:eventId", read);
router.put("/:userId/:eventId", edit);
router.post("/", add);
router.delete("/:userId/:eventId", destroy);
/* ************************************************************************* */

module.exports = router;
