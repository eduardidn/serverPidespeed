import mysql, {Pool} from 'mysql';
import dotenv from 'dotenv';
  if(process.env.NODE_ENV != 'production'){
    dotenv.config();
  }
import { promisify } from 'bluebird';

let database = {
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE
}

const db: any = mysql.createPool(database);

db.getConnection((err: any, connection: any) => {
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
