import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
// Services //
import { database_query } from "../database.service";
// Constants //
import {
  teacher_primary_columns,
  teacher_names_columns,
  teacher_basic_columns,
  teacher_contacts_columns,
} from "../../constants/teacher.constant";

const allColumns = teacher_primary_columns.concat(
  teacher_names_columns,
  teacher_basic_columns,
  teacher_contacts_columns
);

dotenv.config();

// Get all //
export const teacher_getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const column = ["primary_teacher_ID", ...allColumns];

      const result = await database_query(
        `SELECT ${column.join(", ")} FROM ${process.env.DB_TABLE_TEACHER}`
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
// Get one //
export const teacher_getOne = (teacher_ID: number | {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const column = ["primary_teacher_ID", ...allColumns];

      const result = await database_query(
        `SELECT ${column.join(", ")} FROM ${
          process.env.DB_TABLE_TEACHER
        } WHERE teacher_ID = ${teacher_ID}`
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// Create //
export const teacher_createOne = (object: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let columns = allColumns;

      const row = columns.map((element) => {
        if (object[element] == null) {
          reject("You have a missing field.");
        }
        return object[element];
      });

      const email = object["teacher_email"];
      const emailIsValid =
        (
          (await database_query(
            `SELECT teacher_email FROM ${process.env.DB_TABLE_TEACHER} WHERE teacher_email = ?`,
            [email]
          )) as RowDataPacket[]
        ).length === 0;

      if (emailIsValid) {
        const result = await database_query(
          `INSERT INTO ${process.env.DB_TABLE_TEACHER} (${columns.join(
            ", "
          )}) VALUES (${columns.map(() => "?").join(", ")})`,
          row
        );
        resolve(result);
      } else {
        reject("That email is already in use");
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Update //
export const teacher_updateOne = (primary_teacher_ID: number, object: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allowedColumns = allColumns;

      let columns = [];
      let values = [];

      for (let column of allowedColumns) {
        if (column in object) {
          columns.push(`${column} = ?`);
          values.push(object[column]);
        }
      }

      if (columns.length === 0) {
        return resolve({ status: 204, message: "No columns to update." });
      }

      const updateColumns = columns.join(", ");
      const result = await database_query(
        `UPDATE ${process.env.DB_TABLE_TEACHER} SET ${updateColumns} WHERE primary_teacher_ID = ?`,
        [...values, primary_teacher_ID]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// Delete //
export const teacher_deleteOne = (primary_teacher_ID: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await database_query(
        `DELETE FROM ${process.env.DB_TABLE_TEACHER} WHERE primary_teacher_ID = ?`,
        [primary_teacher_ID]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
