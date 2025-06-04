import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: "demodb",
});

con.connect()
.then(() => console.log('Connected to PostgreSQL'))
.catch((err) => {
    console.error('Connection error', err.stack);
    process.exit(1);
});

export default con;
