const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const artistsRouter = require("./artist/router");

router.use("/artist", artistsRouter);

const artistGenreTagsRouter = require("./artistGenreTag/router");

router.use("/artistGenreTag", artistGenreTagsRouter);

const countriesRouter = require("./country/router");

router.use("/country", countriesRouter);

const eventsRouter = require("./event/router");

router.use("/event", eventsRouter);

const eventArtistsRouter = require("./eventArtist/router");

router.use("/eventArtist", eventArtistsRouter);

const genreTagsRouter = require("./genreTag/router");

router.use("/genreTag", genreTagsRouter);

const locationsRouter = require("./location/router");

router.use("/location", locationsRouter);

const usersRouter = require("./user/router");

router.use("/user", usersRouter);

/* ************************************************************************* */

module.exports = router;
