const AbstractRepository = require("./AbstractRepository");

class EventArtistRepository extends AbstractRepository {
  constructor() {
    super({ table: "Event_Artist" });
  }

  async create(relation) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (artist_id, event_id) VALUES (?,?)`,
      [relation.artist_id, relation.event_id]
    );
    return result.insertId;
  }

  async delete(eventId, artistId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE event_id =? AND artist_id = ?`,
      [eventId, artistId]
    );
    return result.affectedRows;
  }
}

module.exports = EventArtistRepository;
