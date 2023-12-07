import { database_query } from "./database.service";
import dotenv from "dotenv";

dotenv.config();

export const getImage = (role: number, id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      switch (role) {
        case 1:
          result = await database_query(
            `SELECT student_image FROM ${process.env.DB_TABLE_STUDENT} WHERE student_ID = ?`,
            [id]
          );
          resolve(result);
          break;
        case 2:
          result = await database_query(
            `SELECT teacher_image FROM ${process.env.DB_TABLE_TEACHER} WHERE teacher_ID = ?`,
            [id]
          );
          resolve(result);
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
};
