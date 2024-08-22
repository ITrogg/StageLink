const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
  constructor() {
    super({ table: "Event" });
  }

  async readByArtist(artistId) {
    const [rows] = await this.database.query(
      `SELECT
        e.start_date AS date,
        l.name AS location,
        l.city AS city     
      FROM
        ${this.table} AS e
      INNER JOIN
        Event_Artist AS a ON e.id = a.event_id
      INNER JOIN
        Location AS l ON e.location_id = l.id 
      WHERE
        a.artist_id = ? `,
      [artistId]
    );
    return rows;
  }
}

module.exports = EventRepository;
