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

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id =?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = EventArtistRepository;
