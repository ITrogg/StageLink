const AbstractRepository = require("./AbstractRepository");

class artistTagRepository extends AbstractRepository {
  constructor() {
    super({ table: "artist_tag" });
  }

  async create(relation) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (artist_id, tag_id) VALUES (?,?)`,
      [relation.artist_id, relation.tag_id]
    );
    return result.insertId;
  }

  async delete(artistId, tagId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE tag_id = ? AND artist_id = ?`,
      [tagId, artistId]
    );
    return result.affectedRows;
  }
}

module.exports = artistTagRepository;
