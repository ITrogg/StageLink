const AbstractRepository = require("./AbstractRepository");

class EventRepository extends AbstractRepository {
  constructor() {
    super({ table: "event" });
  }

  async create(event) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, description, start_date, end_date, start_time, place_id, created_by, poster_image, price_prevent, price_at_door, facebook_link, ticket_link, is_free) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        event.title,
        event.description,
        event.start_date,
        event.end_date,
        event.start_time,
        event.place_id,
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
        e.title,
        e.start_date,
        p.name AS place_name,
        e.poster_image
      FROM 
          ${this.table} AS e
      JOIN 
          place AS p ON e.place_id = p.id
      WHERE 
          e.start_date >= CURDATE()
      ORDER BY 
          e.start_date ASC`);
    return rows;
  }

  async readFuturByLocation(placeId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.title,
        e.start_date,
        p.name AS place_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        place AS p ON e.place_id = p.id
      WHERE 
        p.id = ?
      AND 
        e.start_date >= CURDATE()
      ORDER BY 
        e.start_date ASC`,
      [placeId]
    );
    return rows;
  }

  async readPastByLocation(placeId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.title,
        e.start_date,
        p.name AS place_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        place AS p ON e.place_id = p.id
      WHERE 
        p.id = ?
      AND 
        e.start_date < CURDATE()
      ORDER BY 
        e.start_date ASC`,
      [placeId]
    );
    return rows;
  }

  async readPastByArtist(artistId) {
    const [rows] = await this.database.query(
      `SELECT 
        e.id,
        e.title,
        e.start_date,
        p.name AS place_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        place AS p ON e.place_id = p.id
      JOIN 
        event_Artist ea ON e.id = ea.event_id
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
        e.title,
        e.start_date,
        p.name AS place_name,
        e.poster_image
      FROM 
        ${this.table} AS e
      JOIN 
        place AS p ON e.place_id = p.id
      JOIN 
        event_Artist ea ON e.id = ea.event_id
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

  async readbyUser(userId) {
    const [rows] = await this.database.query(
      `SELECT 
        ss.label, 
        ss.id, 
        e.title, 
        e.start_date, 
        e.end_date, 
        e.start_time, 
        e.id,
        e.poster_image,
        p.name 
      FROM ${this.table} as e 
      JOIN event_Save AS es ON e.id = es.event_id 
      JOIN save_status AS ss ON es.status_id = ss.id 
      JOIN place AS p ON p.id = e.place_id
      WHERE es.user_id = ? `,
      [userId]
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
        p.name AS place_name,
        e.poster_image,
        e.price_prevent,
        e.price_at_door,
        e.facebook_link,
        e.ticket_link,
        e.is_free
      FROM 
        ${this.table} AS e
      JOIN 
        place AS p ON e.place_id = p.id
      WHERE 
        e.id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, event) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} 
       SET description = ?, start_time = ?, poster_image = ?,price_prevent = ?, price_at_door = ?, facebook_link = ?, ticket_link = ?, is_free = ? 
       WHERE id = ?`,
      [
        event.description,
        event.start_time,
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
