const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
  constructor() {
    super({ table: "Event" });
  }

  async create(event) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, start_date, end_date, start_time,location_id, created_by, poster_image, price_prevent, price_at_door, facebook_link, ticket_link, is_free) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        event.title,
        event.description,
        event.start_date,
        event.end_date,
        event.start_time,
        event.location_id,
        event.created_by,
        event.poster_image,
        event.price_prevent,
        event.price_at_door,
        event.facebook_link,
        event.ticket_link,
        event.is_free,
      ]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`
      SELECT 
        e.id,
        e.start_date,
        l.name AS location_name,
        e.poster_image
      FROM 
          ${this.table} AS e
      JOIN 
          Location AS l ON e.location_id = l.id
      WHERE 
          e.start_date >= CURDATE()
      ORDER BY 
          e.start_date ASC`);
    return rows;
  }

  async readFuturByLocation(locationId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.start_date,
        l.name AS location_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        Location AS l ON e.location_id = l.id
      WHERE 
        l.id = ?
      AND 
        e.start_date >= CURDATE()
      ORDER BY 
        e.start_date ASC`,
      [locationId]
    );
    return rows;
  }

  async readPastByLocation(locationId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.start_date,
        l.name AS location_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        Location AS l ON e.location_id = l.id
      WHERE 
        l.id = ?
      AND 
        e.start_date < CURDATE()
      ORDER BY 
        e.start_date ASC`,
      [locationId]
    );
    return rows;
  }

  async readPastByArtist(artistId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.start_date,
        l.name AS location_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        Location AS l ON e.location_id = l.id
      JOIN 
        Event_Artist ea ON e.id = ea.event_id
      WHERE 
        ea.artist_id = ? 
      AND 
        e.start_date < CURDATE()  
      ORDER BY 
        e.start_date ASC`,
      [artistId]
    );
    return rows;
  }

  async readFuturByArtist(artistId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.start_date,
        l.name AS location_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        Location AS l ON e.location_id = l.id
      JOIN 
        Event_Artist ea ON e.id = ea.event_id
      WHERE 
        ea.artist_id = ? 
      AND 
        e.start_date >= CURDATE()  
      ORDER BY 
        e.start_date ASC`,
      [artistId]
    );
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT
        e.id,
        e.title,
        e.description,
        e.start_date,
        e.end_date,
        e.start_time,
        l.name AS location_name,
        e.poster_image,
        e.price_prevent,
        e.price_at_door,
        e.facebook_link,
        e.ticket_link,
        e.is_free
      FROM 
        ${this.table} AS e
      JOIN 
        Location AS l ON e.location_id = l.id
      WHERE 
        e.id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, event) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET title = ?, description = ?, start_date = ?, end_date = ?, start_time = ?, 
           location_id = ?, poster_image = ?, price_prevent = ?, price_at_door = ?, 
           facebook_link = ?, ticket_link = ?, is_free = ? 
       WHERE id = ?`,
      [
        event.title,
        event.description,
        event.start_date,
        event.end_date,
        event.start_time,
        event.location_id,
        event.poster_image,
        event.price_prevent,
        event.price_at_door,
        event.facebook_link,
        event.ticket_link,
        event.is_free,
        id,
      ]
    );
    return result.affectedRows;
  }
}

module.exports = EventRepository;
