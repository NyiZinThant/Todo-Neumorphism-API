import db from '../config/database.js';

const getAllTodo = async () => {
  const [rows] = await db.query('SELECT * FROM todo');
  return rows;
};

export default { getAllTodo };
