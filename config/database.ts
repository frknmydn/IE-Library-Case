import { Sequelize } from 'sequelize';
import config from './config.json';

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

interface Config {
  development: DbConfig;
}

const env = process.env.NODE_ENV as keyof Config || 'development';
const dbConfig = config[env]; 

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as any,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
);

export default sequelize;