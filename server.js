import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import todoRouter from './routes/todo.js';

const app = express();
const port = process.env.PORT || 3000;

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/todos', todoRouter);
// error handler
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
