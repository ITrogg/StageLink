const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/artistActions");

router.get("/", browse);
router.get("/:id", read);
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
