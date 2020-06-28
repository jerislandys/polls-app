import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: 5000,
  MONGO_URI: 'mongodb://localhost',
  MONGO_DB_NAME: 'polls-app',
  JWT_SECRET: '5h4ll0m_JwtSecret'
};
