const AbstractRepository = require("./AbstractRepository");

class PlaceRepository extends AbstractRepository {
  constructor() {
    super({ table: "place" });
  }

  async create(place) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, address, city, state, country, postal_code, latitude, longitude) VALUES (?,?,?,?,?,?,?,?)`,
      [
        place.name,
        place.address,
        place.city,
        place.state,
        place.country,
        place.postal_code,
        place.latitude,
        place.longitude,
      ]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
        p.id,
        p.name,
        p.logo,
        p.latitude,
        p.longitude,
        COUNT(e.id) AS events
      FROM 
          ${this.table} AS p
      LEFT JOIN 
          Event e ON p.id = e.place_id AND e.start_date >= CURDATE()
      GROUP BY 
          p.id, p.name, p.latitude, p.longitude`
    );
    return rows;
  }

  async readForInput() {
    const [rows] = await this.database.query(
      `SELECT 
        id,
        name as label
      FROM 
          ${this.table}`
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT 
        name,
        address,
        city,
        state,
        country,
        postal_code,
        capacity,
        logo,
        latitude,
        longitude
      FROM 
          ${this.table}
      WHERE 
          id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, location) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET
        capacity = ?, 
        logo = ?, 
       WHERE id = ?`,
      [location.capacity, location.logo, id]
    );
    return result.affectedRows;
  }
}

module.exports = PlaceRepository;
