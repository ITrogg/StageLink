const AbstractRepository = require("./AbstractRepository");

class ArtistRepository extends AbstractRepository {
  constructor() {
    super({ table: "Artist" });
  }

  async create(artist) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, shortDesc) VALUES (?,?)`,
      [artist.name, artist.shortDesc]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
        a.id, 
        a.name, 
        a.shortDesc, 
        COUNT(e.event_id) AS events
      FROM
        ${this.table} AS a
      LEFT JOIN
        event_Artist AS e ON a.id = e.artist_id
      GROUP BY 
        a.id, a.name, a.shortDesc
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
        a.shortDesc,
        COUNT(e.id) AS events
      FROM 
        ${this.table} AS a
      JOIN 
        event_Artist AS ea ON a.id = ea.artist_id
      LEFT JOIN 
        event AS e ON ea.event_id = e.id AND e.start_date > CURDATE()
      WHERE 
        ea.event_id = ?
      GROUP BY
        a.id, a.name, a.shortDesc;`,
      [eventId]
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT
        id,
        name,
        logo,
        shortDesc
      FROM
        ${this.table}
      WHERE
        id = ?`,
      [id]
    );
    return rows[0];
  }

  async readForTag(id) {
    const [rows] = await this.database.query(
      `SELECT 
        id, 
        name AS label
      FROM
        ${this.table} 
      WHERE
        id = ?
      `,
      [id]
    );
    return rows;
  }

  async update(id, artist) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET  
        logo = ?, 
        shortDesc = ?
       WHERE id = ?`,
      [artist.logo, artist.shortDesc, id]
    );
    return result.affectedRows;
  }
}

module.exports = ArtistRepository;
