require('dotenv').config()
const {Pool} = require('pg')

const Dbconfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript){

    try {
        const pool = new Pool(Dbconfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
       
    } catch (error) {
        console.log('Erro ao executar SQL script:', error)
    }

    
    
}