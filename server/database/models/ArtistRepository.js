const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "Artist" });
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
        a.id AS id, 
        a.name AS name, 
        a.genre AS genre, 
        COUNT(e.event_id) AS events
      FROM
        Artist AS a
      LEFT JOIN
        Event_Artist AS e ON a.id = e.artist_id
      GROUP BY 
        a.id, a.name, a.genre`
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = UserRepository;
