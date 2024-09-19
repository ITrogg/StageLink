const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const artistsRouter = require("./artist/router");

router.use("/artist", artistsRouter);

const artistTagsRouter = require("./artistTag/router");

router.use("/artistTag", artistTagsRouter);

const eventsRouter = require("./event/router");

router.use("/event", eventsRouter);

const eventArtistsRouter = require("./eventArtist/router");

router.use("/eventArtist", eventArtistsRouter);

const tagsRouter = require("./tag/router");

router.use("/tag", tagsRouter);

const placesRouter = require("./place/router");

router.use("/place", placesRouter);

const usersRouter = require("./user/router");

router.use("/user", usersRouter);

/* ************************************************************************* */

module.exports = router;
