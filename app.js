import express from 'express';
import logger from 'volleyball';
import appRoute from './server/routes/appRoutes';

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

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Kommunity is listening on port ${port}`);
});

export default app;
