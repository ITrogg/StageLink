const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add } = require("../../../controllers/userActions");

router.post("/", add);

/* ************************************************************************* */

module.exports = router;
