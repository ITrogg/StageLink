const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add, destroy } = require("../../../controllers/ArtistGenreTagActions");

router.post("/", add);
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
