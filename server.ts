import express from 'express';
import errorHandler from './middlewares/errorHandler';
import todoRouter from './routes/todo';
import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// routes
app.use('/api/v1/todos', todoRouter);
// error handler
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
