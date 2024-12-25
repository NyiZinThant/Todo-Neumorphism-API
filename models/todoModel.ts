import { RowDataPacket } from 'mysql2';
import db from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
export interface Todo {
  id: string;
  label: string;
  completed: 1 | 0;
  created_at: string;
}
export interface TodoRow extends RowDataPacket, Todo {}
// fetch all todos
const getAllTodo = async () => {
  try {
    const [rows] = await db.query<TodoRow[]>(
      'SELECT * FROM todo ORDER BY created_at DESC'
    );
    return rows.map((todo) => {
      return { ...todo, completed: !!todo.completed };
    });
  } catch (error) {
    throw error;
  }
};

// update todo completed
const updateTodoCompleted = async (id: string, completed: boolean) => {
  try {
    await getTodoById(id);
    await db.query('UPDATE todo SET completed=? WHERE id=?', [completed, id]);
  } catch (error) {
    throw error;
  }
};

// get todo by id
const getTodoById = async (id: string) => {
  try {
    const [result] = await db.query<TodoRow[]>(
      'SELECT * FROM todo WHERE id=?',
      [id]
    );
    if (result.length < 1)
      throw new Error('Todo with the specified ID does not exist.');
    return { ...result[0], completed: !!result[0].completed };
  } catch (error) {
    throw error;
  }
};
// add new todo
const addTodo = async (label: string) => {
  try {
    const id = uuidv4();
    await db.query('INSERT INTO todo(id, label) VALUES(?, ?)', [id, label]);
  } catch (error) {
    throw error;
  }
};
export default { getAllTodo, updateTodoCompleted, getTodoById, addTodo };
