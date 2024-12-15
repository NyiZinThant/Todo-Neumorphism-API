import db from '../config/database.js';
// fetch all todos
const getAllTodo = async () => {
  try {
    const [rows] = await db.query(
      'SELECT *, IF(completed, "true", "false") completed FROM todo'
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// update todo completed
const updateTodoCompleted = async (id, completed) => {
  try {
    await getTodoById(id);
    await db.query('UPDATE todo SET completed=? WHERE id=?', [completed, id]);
  } catch (error) {
    throw error;
  }
};

// get todo by id
const getTodoById = async (id) => {
  try {
    const [result] = await db.query('SELECT * FROM todo WHERE id=?', [id]);
    if (result.length < 1)
      throw new Error('Todo with the specified ID does not exist.');
    return id[0];
  } catch (error) {
    throw error;
  }
};

export default { getAllTodo, updateTodoCompleted, getTodoById };
