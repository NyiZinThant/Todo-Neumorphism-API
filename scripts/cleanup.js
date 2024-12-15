import db from '../config/database.js';

const cleanUpTodo = async () => {
  try {
    await db.query('DELETE FROM todo');
    console.log('Database cleanup success.');
    process.exit(1);
  } catch (error) {
    console.error('Cleanup database error: ', error);
    process.exit(1);
  }
};

cleanUpTodo();
