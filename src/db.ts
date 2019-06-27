import mysql from 'mysql';

import keys from './keys';
import { promisify } from 'bluebird';

const db = mysql.createPool(keys.database);

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

//Promisify Pool Querys
 db.query = promisify(db.query)

export default db;
