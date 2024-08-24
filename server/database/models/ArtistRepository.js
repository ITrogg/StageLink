const AbstractRepository = require("./AbstractRepository");

class ArtistRepository extends AbstractRepository {
  constructor() {
    super({ table: "Artist" });
  }

  async create(artist) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, country_id, genre) VALUES (?,?,?)`,
      [artist.name, artist.country_id, artist.genre]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
        a.id AS id, 
        a.name AS name, 
        a.genre AS genre, 
        COUNT(e.event_id) AS events
      FROM
        ${this.table} AS a
      LEFT JOIN
        Event_Artist AS e ON a.id = e.artist_id
      GROUP BY 
        a.id, a.name, a.genre
      LIMIT 50`
    );
    return rows;
  }

  async readForInput() {
    const [rows] = await this.database.query(
      `SELECT 
        id, 
        name AS label
      FROM
        ${this.table} 
      `
    );
    return rows;
  }

  async readbyEvent(eventId) {
    const [rows] = await this.database.query(
      `SELECT
        a.id,
        a.name,
        a.genre,
        COUNT(e.id) AS events
      FROM 
        ${this.table} AS a
      JOIN 
        Event_Artist AS ea ON a.id = ea.artist_id
      LEFT JOIN 
        Event AS e ON ea.event_id = e.id AND e.start_date > CURDATE()
      WHERE 
        ea.event_id = ?
      GROUP BY
        a.id, a.name, a.genre;`,
      [eventId]
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT
        a.id AS id,
        a.name AS name,
        a.logo AS logo,
        a.genre AS genre,
        a.facebook_link AS facebook_link,
        a.twitter_link AS twitter_link,
        a.instagram_link AS instagram_link,
        a.website AS website,
        a.youtube_link AS youtube_link,
        a.bandcamp_link AS bandcamp_link,
        a.spotify_link AS spotify_link,
        a.deezer_link AS deezer_link,
        a.apple_music_link AS apple_music_link,
        a.amazon_music_link AS amazon_music_link,
        c.label AS country
      FROM
        ${this.table} AS a
      LEFT JOIN
        Country AS c ON a.country_id = c.id
      WHERE
        a.id = ?
      GROUP BY
        a.id, c.label`,
      [id]
    );
    return rows[0];
  }

  async update(id, artist) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET  
        country_id = ?, 
        logo = ?, 
        genre = ?, 
        facebook_link = ?, 
        twitter_link = ?, 
        instagram_link = ?, 
        website = ?, 
        youtube_link = ?, 
        bandcamp_link = ?, 
        spotify_link = ?, 
        deezer_link = ?, 
        apple_music_link = ?, 
        amazon_music_link = ? 
       WHERE id = ?`,
      [
        artist.country_id,
        artist.logo,
        artist.genre,
        artist.facebook_link,
        artist.twitter_link,
        artist.instagram_link,
        artist.website,
        artist.youtube_link,
        artist.bandcamp_link,
        artist.spotify_link,
        artist.deezer_link,
        artist.apple_music_link,
        artist.amazon_music_link,
        id,
      ]
    );
    return result.affectedRows;
  }
}

module.exports = ArtistRepository;
