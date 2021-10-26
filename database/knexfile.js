import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../', '.env') });

const folders = {
  seeds: {
    directory: path.join(__dirname, './seeds/'),
  },
  migrations: {
    tableName: 'nest-demo-migrations',
    directory: path.join(__dirname, './migrations/'),
  },
};

const connection = {
  host: process.env.DB__HOST,
  user: process.env.DB__USER,
  password: process.env.DB__PASSWORD,
  database: process.env.DB__NAME,
  debug: false,
}

module.exports = {
  development: {
    client: 'mysql',
    connection,
    port: 80,
    ...folders,
  },
  production: {
    client: 'mysql',
    connection,
    port: 80,
    ...folders,
  },
};
