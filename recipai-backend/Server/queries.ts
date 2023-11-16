

const Pool = require('pg').Pool

//TODO 
//Use this if we need specific queries ran? may remove entirely if not needed.
//pool.query('$SELECT....)
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT

})