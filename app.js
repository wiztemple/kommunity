import express from 'express';
import logger from 'volleyball';
import dotenv from 'dotenv';

import appRoute from './server/routes/appRoutes';

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome to Kommunity, a platform to ask questions and answer questions',
}));

app.use('/api/v1/questions', appRoute);
app.use((request, response, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
  next();
});
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Kommunity is listening on port ${port}`);
});

export default app;
