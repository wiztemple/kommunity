import express from 'express';
import logger from 'volleyball';
import dotenv from 'dotenv';
import authRoute from './server/routes/authRoute';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome to Kommunity, a platform to ask questions and answer questions',
}));
// app route
app.use('/api/v1/auth', authRoute);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Kommunity is listening on port ${port}`);
});

export default app;
