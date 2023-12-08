import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
// Services //
import { database_query } from "../database.service";
// Constants //
import {
  student_primary_columns,
  student_names_columns,
  student_basic_columns,
  student_contacts_columns,
} from "../../constants/student.constant";

dotenv.config();

const allColumns = student_primary_columns.concat(
  student_names_columns,
  student_basic_columns,
  student_contacts_columns
);

// Get all //
export const student_getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let columns = ["primary_student_ID", ...allColumns];

      const result = await database_query(
        `SELECT ${columns.join(", ")} FROM ${process.env.DB_TABLE_STUDENT}`
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
// Get one //
export const student_getOne = (student_ID: number | {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let columns = ["primary_student_ID", ...allColumns];

      const result = await database_query(
        `SELECT ${columns.join(", ")} FROM ${
          process.env.DB_TABLE_STUDENT
        } WHERE student_ID = ${student_ID}`
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// Create //
export const student_createOne = (object: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const columns = allColumns;

      const row = columns.map((element) => {
        if (object[element] == null) {
          reject("You have a missing field.");
        }
        return object[element];
      });

      const email = object["student_email"];
      const emailIsValid =
        (
          (await database_query(
            `SELECT student_email FROM ${process.env.DB_TABLE_STUDENT} WHERE student_email = ?`,
            [email]
          )) as RowDataPacket[]
        ).length === 0;

      if (emailIsValid) {
        const result = await database_query(
          `INSERT INTO ${process.env.DB_TABLE_STUDENT} (${columns.join(
            ", "
          )}) VALUES (${columns.map(() => "?").join(", ")})`,
          row
        );
        resolve(result);
      } else {
        reject("That email is already in use.");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const student_updateOne = (primary_student_ID: number, object: any) => {
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
        `UPDATE ${process.env.DB_TABLE_STUDENT} SET ${updateColumns} WHERE primary_student_ID = ?`,
        [...values, primary_student_ID]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const student_deleteOne = (primary_student_ID: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await database_query(
        `DELETE FROM ${process.env.DB_TABLE_STUDENT} WHERE primary_student_ID = ?`,
        [primary_student_ID]
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
