import express from 'express';

import routes from './src/routes';
import access from './src/middlewares/cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json(),
  routes
);
access(app);

app.listen(port, () => console.log(`http://localhost:${port}`));