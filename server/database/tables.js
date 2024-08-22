// Import the repository modules responsible for handling data operations on the tables
const ArtistRepository = require("./models/ArtistRepository");
const ArtistGenreTagRepository = require("./models/ArtistGenreTagRepository");
const CountryRepository = require("./models/CountryRepository");
const EventRepository = require("./models/EventRepository");
const GenreTagRepository = require("./models/GenreTagRepository");
const LocationRepository = require("./models/LocationRepository");
const UserRepository = require("./models/UserRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.Artist = new ArtistRepository();
tables.ArtistGenreTag = new ArtistGenreTagRepository();
tables.Country = new CountryRepository();
tables.Event = new EventRepository();
tables.GenreTag = new GenreTagRepository();
tables.Location = new LocationRepository();
tables.User = new UserRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
