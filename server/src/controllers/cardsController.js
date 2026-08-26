import pool from "../db";

export const getAllCards = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM cards");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
