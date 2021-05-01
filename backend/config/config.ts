import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'wlgh0419',
        database: process.env.DB_DBNAME || 'testonly',
        host: process.env.DB_HOST || '172.17.0.2',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql'
    }
}