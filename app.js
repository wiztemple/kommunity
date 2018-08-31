import express from 'express';
import logger from 'volleyball';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import authRoute from './server/routes/authRoute';
import questionRoute from './server/routes/questionRoute';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// app.get('/', (request, response) => response.status(200).json({
//   status: 'success',
//   message: 'Welcome to Kommunity, a platform to ask questions and answer questions',
// }));
// app route
app.use('/', express.static('client'));
app.get('/', (request, response) => response.sendfile('./client/index.html'));

// connect static files
app.use(express.static(path.resolve(__dirname, './client/')));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/question', questionRoute);
app.use((request, response) => response.status(404).json({
  message: 'Sorry, not found',
}));
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Kommunity is listening on port ${port}`);
});

export default app;
