const AbstractRepository = require("./AbstractRepository");

class GenreTagRepository extends AbstractRepository {
  constructor() {
    super({ table: "Genre_Tag" });
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async readByArtist(artistId) {
    const [rows] = await this.database.query(
      `SELECT gt.label, gt.id FROM ${this.table} AS gt JOIN Artist_Genre_Tag AS agt ON gt.id = agt.genre_tag_id WHERE agt.artist_id=?`,
      [artistId]
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

  async create(label) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (label) VALUES (?)`,
      [label]
    );
    return result.insertId;
  }
}

module.exports = GenreTagRepository;
