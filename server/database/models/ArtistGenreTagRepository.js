const AbstractRepository = require("./AbstractRepository");

class artistGenreTagRepository extends AbstractRepository {
  constructor() {
    super({ table: "Artist_Genre_Tag" });
  }

  async create(relation) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (artist_id, genre_tag_id) VALUES (?,?)`,
      [relation.artist_id, relation.genre_tag_id]
    );
    return result.insertId;
  }

  async delete(artistId, genreId) {
    const [result] = await this.database.query(
      `DELETE FROM Artist_Genre_Tag WHERE genre_tag_id = ? AND artist_id = ?`,
      [genreId, artistId]
    );
    return result.affectedRows;
  }
}

module.exports = artistGenreTagRepository;
