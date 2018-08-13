import express from 'express';
import logger from 'volleyball';

const app = express();

const port = process.env.PORT || 8000;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome to Kommunity, a platform to ask questions and answer questions',
}));

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Kommunity is listening on port ${port}`);
});

export default app;
