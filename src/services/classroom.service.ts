import dotenv from "dotenv";
// Services //
import { database_query } from "./database.service";

dotenv.config();

// Get all //
export const classroom_getAll = () => {
  return new Promise(async (resolve, reject) => {
    const query = `SELECT * FROM ${process.env.DB_TABLE_CLASSROOM}`;
    database_query(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// Get classroom by given level //
export const classroom_getClassroomByLevel = async (level: number) => {
  return new Promise(async (resolve, reject) => {
    const query = `SELECT classroom_class, classroom_major FROM ${process.env.DB_TABLE_CLASSROOM} WHERE classroom_level = ?`;
    database_query(query, [level])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// Get classroom by given teacher ID. //
export const classroom_getClassroomByTeacher = (teacher_ID: number) => {
  return new Promise(async (resolve, reject) => {
    const query = `SELECT * FROM ${process.env.DB_TABLE_CLASSROOM} WHERE classroom_homeroom_teacher = ?`;
    database_query(query, [teacher_ID])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Update //
export const classroom_updateOne = (classroom_ID: number, object: any) => {
  return new Promise(async (resolve, reject) => {
    const allowedColumns = [
      "classroom_major",
      "classroom_level",
      "classroom_class",
      "classroom_homeroom_teacher",
    ];
    const columns = [];
    const values = [];

    for (const column of allowedColumns) {
      if (column in object) {
        columns.push(`${column} = ?`);
        values.push(object[column]);
      }
    }

    if (columns.length === 0) {
      return reject("No columns to update.");
    }

    const query = `UPDATE ${process.env.DB_TABLE_CLASSROOM} SET ${columns.join(
      ", "
    )} WHERE classroom_ID = ?`;
    database_query(query, [...values, classroom_ID])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Delete //
export const classroom_deleteOne = (classroom_ID: number) => {
  return new Promise(async (resolve, reject) => {
    const query = `DELETE FROM ${process.env.DB_TABLE_CLASSROOM} WHERE classroom_ID = ?`;
    database_query(query, [classroom_ID])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
