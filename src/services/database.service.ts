import mysql from "mysql2/promise";
// Configs //
import { database_config } from "../configs/database.config";

export const database_query = async (
  sql: string,
  params?: Array<string | number>
) => {
  const connection = await mysql.createConnection(database_config.sql);
  const [results] = await connection.execute(sql, params);

  return results;
};
