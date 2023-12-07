export const database_config = {
  ftpConfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  },
  sql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
