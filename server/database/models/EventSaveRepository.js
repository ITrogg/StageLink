const AbstractRepository = require("./AbstractRepository");

class EventSaveRepository extends AbstractRepository {
  constructor() {
    super({ table: "Event_Save" });
  }

  async create(relation) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, event_id, status) VALUES (?,?,?)`,
      [relation.user_id, relation.event_id, relation.status]
    );
    return result.insertId;
  }

  async read(eventId, userId) {
    const [result] = await this.database.query(
      `SELECT status FROM ${this.table} WHERE event_id = ? AND user_id = ? `,
      [eventId, userId]
    );
    return result[0];
  }

  async update(eventId, userId, newStatus) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET status = ? WHERE event_id = ? AND user_id = ? `,
      [newStatus, eventId, userId]
    );
    return result.affectedRows;
  }

  async delete(userId, eventId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND event_id = ?`,
      [userId, eventId]
    );
    return result.affectedRows;
  }
}

module.exports = EventSaveRepository;
