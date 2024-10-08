const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add, destroy } = require("../../../controllers/artistTagActions");

router.post("/", add);
router.delete("/", destroy);

/* ************************************************************************* */

module.exports = router;
