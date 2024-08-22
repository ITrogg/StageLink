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

  async readbyEvent(eventId) {
    const [rows] = await this.database.query(
      `SELECT
        a.id,
        a.name
      FROM 
        ${this.table} a
      JOIN 
        Event_Artist ea ON a.id = ea.artist_id
      WHERE 
        ea.event_id = ?`,
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
        c.label AS country,
        GROUP_CONCAT(gt.label ORDER BY gt.label ASC) AS genre_tags
      FROM
        ${this.table} AS a
      LEFT JOIN
        Country AS c ON a.country_id = c.id
      LEFT JOIN
        Artist_Genre_Tag AS agt ON a.id = agt.artist_id
      LEFT JOIN
        Genre_Tag AS gt ON agt.genre_tag_id = gt.id
      WHERE
        a.id = ?
      GROUP BY
        a.id, c.label`,
      [id]
    );
    return rows[0];
  }
}

module.exports = ArtistRepository;
