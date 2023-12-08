import dotenv from "dotenv"
// Services //
import { database_query } from "./database.service";

dotenv.config();

export const major_getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM ${process.env.DB_TABLE_MAJOR}`;
      const results = await database_query(sql);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
