const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./user/router");

router.use("/user", usersRouter);

const artistsRouter = require("./artist/router");

router.use("/artist", artistsRouter);

/* ************************************************************************* */

module.exports = router;
