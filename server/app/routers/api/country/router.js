const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, add } = require("../../../controllers/countryActions");

router.get("/", browse);
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
