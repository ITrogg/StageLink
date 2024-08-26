const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const validateUser = require("../../../services/userValidation");
const { read, add } = require("../../../controllers/userActions");

router.post("/", validateUser, add);
router.post("/login", read);

/* ************************************************************************* */

module.exports = router;
