const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { read, add } = require("../../../controllers/userActions");

router.post("/", add);
router.post("/login", read);

/* ************************************************************************* */

module.exports = router;
