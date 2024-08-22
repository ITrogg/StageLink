const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const artistsRouter = require("./artist/router");

router.use("/artist", artistsRouter);

const eventsRouter = require("./event/router");

router.use("/event", eventsRouter);

const locationsRouter = require("./location/router");

router.use("/location", locationsRouter);

const usersRouter = require("./user/router");

router.use("/user", usersRouter);

/* ************************************************************************* */

module.exports = router;
