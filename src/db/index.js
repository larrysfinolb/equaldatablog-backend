import mssql from 'mssql';
import config from '../config/index.js';

const OPTIONS = {
  user: config.db.user,
  password: config.db.password,
  server: config.db.server,
  database: config.db.database,
  options: {
    trustServerCertificate: true,
  },
};

const connection = async () => {
  try {
    const pool = await mssql.connect(OPTIONS);
    return pool;
  } catch (error) {
    console.error('Error connecting to the database: ', error);
    throw error;
  }
};

export default connection;
