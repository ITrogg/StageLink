const AbstractRepository = require("./AbstractRepository");

class LocationRepository extends AbstractRepository {
  constructor() {
    super({ table: "Location" });
  }

  async create(location) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, address, city, state, country, postal_code, latitude, longitude) VALUES (?,?,?,?,?,?,?,?)`,
      [
        location.name,
        location.address,
        location.city,
        location.state,
        location.country,
        location.postal_code,
        location.latitude,
        location.longitude,
      ]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT 
        l.id,
        l.name,
        l.latitude,
        l.longitude,
        COUNT(e.id) AS events
      FROM 
          ${this.table} AS l
      LEFT JOIN 
          Event e ON l.id = e.location_id AND e.start_date >= CURDATE()
      GROUP BY 
          l.id, l.name, l.latitude, l.longitude`
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
        facebook_link,
        twitter_link,
        instagram_link,
        website,
        logo,
        year_opened,
        is_closed,
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
        facebook_link = ?, 
        twitter_link = ?, 
        instagram_link = ?, 
        website = ?, 
        logo = ?, 
        year_opened = ?, 
        is_closed = ? 
       WHERE id = ?`,
      [
        location.capacity,
        location.facebook_link,
        location.twitter_link,
        location.instagram_link,
        location.website,
        location.logo,
        location.year_opened,
        location.is_closed,
        id,
      ]
    );
    return result.affectedRows;
  }
}

module.exports = LocationRepository;
