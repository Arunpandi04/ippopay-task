import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import getUserRoutes from './Routes';
import initializeDBConnection from './Config/db';
import config from './Config';

const app = express();

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

app.use('/', getUserRoutes(router));

app.listen(config.PORT, async() => {
  await initializeDBConnection();
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})