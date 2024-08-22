const AbstractRepository = require("./AbstractRepository");

class LocationRepository extends AbstractRepository {
  constructor() {
    super({ table: "Location" });
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

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT 
        l.name,
        l.address,
        l.city,
        l.state,
        c.label AS country,
        l.postal_code,
        l.capacity,
        l.facebook_link,
        l.twitter_link,
        l.instagram_link,
        l.website,
        l.logo,
        l.year_opened,
        l.is_closed,
        l.latitude,
        l.longitude
      FROM 
          Location l
      JOIN 
          Country c ON l.country_id = c.id
      WHERE 
          l.id = ?;
      `,
      [id]
    );
    return rows[0];
  }
}

module.exports = LocationRepository;
