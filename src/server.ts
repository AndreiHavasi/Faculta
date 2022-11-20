import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/routes';
import mongoose from 'mongoose';

const cookieParser = require('cookie-parser');
require('dotenv').config();

const app: Express = express();
mongoose.connect(
  process.env.MONGO_URI!,
  {
    autoIndex: true,
  },
  () => {
    console.log('Connected to MongoDB');
  }
);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    return res.status(200).json({});
  }
  next();
});

app.use('/', routes);
app.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
