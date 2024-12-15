import db from './config/database.js';
import todoModel from './models/todoModel.js';

await todoModel.getTodoById('0ab447fa-8dc2-42dc-b328-891ea7afae42');
