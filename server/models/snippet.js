import pool from '../db.js';

export const Snippet = {
  async findAll(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM snippets WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  async findById(id, userId) {
    const { rows } = await pool.query(
      'SELECT * FROM snippets WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return rows[0];
  },

  async create({ title, description, code, language, tags, userId }) {
    const { rows } = await pool.query(
      `INSERT INTO snippets (title, description, code, language, tags, user_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, code, language, tags || [], userId]
    );
    return rows[0];
  },

  async update(id, userId, { title, description, code, language, tags }) {
    const { rows } = await pool.query(
      `UPDATE snippets SET title=$1, description=$2, code=$3, language=$4, tags=$5, updated_at=NOW()
       WHERE id=$6 AND user_id=$7 RETURNING *`,
      [title, description, code, language, tags || [], id, userId]
    );
    return rows[0];
  },

  async delete(id, userId) {
    const { rowCount } = await pool.query(
      'DELETE FROM snippets WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return rowCount > 0;
  },

  async search(query, userId) {
    const { rows } = await pool.query(
      `SELECT * FROM snippets WHERE user_id = $1
       AND (title ILIKE $2 OR description ILIKE $2 OR code ILIKE $2)
       ORDER BY created_at DESC`,
      [userId, `%${query}%`]
    );
    return rows;
  },
};
