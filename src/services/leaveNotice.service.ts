import dayjs from "dayjs";
import dotenv from "dotenv";
// Services //
import { database_query } from "./database.service";
// Constants //
import {
  leaveNotice_head_columns,
  leaveNotice_student_columns,
  leaveNotice_teacher_columns,
} from "../constants/leaveNotice.constant";

dotenv.config();

// Get all //
export const leaveNotice_getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_LEAVE_NOTICE}`;
      const results = await database_query(sqlQuery);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
// Get one //
export const leaveNotice_getOne = (leave_notice_ID: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_LEAVE_NOTICE} WHERE leave_notice_ID = ?`;
      const results = await database_query(sqlQuery, [leave_notice_ID]);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

// Create //
export const leaveNotice_createOne = (object: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      object.leave_notice_create_datetime = dayjs().toISOString();

      const columns = [
        "leave_notice_student_ID",
        ...leaveNotice_student_columns,
      ];
      const values = columns.map((column) => object[column]);
      const placeholders = new Array(values.length).fill("?").join(", ");

      const sqlQuery = `INSERT INTO ${
        process.env.DB_TABLE_LEAVE_NOTICE
      } (${columns.join(", ")}) VALUES (${placeholders})`;

      const results = await database_query(sqlQuery, values);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

// Update //
export const leaveNotice_updateOne = (
  leave_notice_ID: number,
  updateAs: number,
  object: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let allowedColumns;
      switch (updateAs) {
        // If student updates //
        case 1:
          object.leave_notice_create_datetime = dayjs().toISOString();
          allowedColumns = leaveNotice_student_columns;
          break;
        // If teacher evaluates //
        case 2:
          object.leave_notice_teacher_change_datetime = dayjs().toISOString();
          allowedColumns = leaveNotice_teacher_columns;
          break;
        // If head evaluates //
        case 3:
          object.leave_notice_head_change_datetime = dayjs().toISOString();
          allowedColumns = leaveNotice_head_columns;
          break;
        default:
          allowedColumns = leaveNotice_student_columns.concat(
            leaveNotice_teacher_columns,
            leaveNotice_head_columns
          );
          break;
      }
      const columns = [];
      const values = [];
      for (const column of allowedColumns) {
        if (column in object) {
          columns.push(`${column} = ?`);
          values.push(object[column]);
        }
      }

      if (columns.length === 0) {
        return resolve({ status: 204, message: "No columns to update." });
      }

      const sqlQuery = `UPDATE ${
        process.env.DB_TABLE_LEAVE_NOTICE
      } SET ${columns.join(", ")} WHERE leave_notice_ID = ?`;

      values.push(leave_notice_ID);
      const results = await database_query(sqlQuery, values);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

// Delete //
export const leaveNotice_deleteOne = (leave_notice_ID: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlQuery = `DELETE FROM ${process.env.DB_TABLE_LEAVE_NOTICE} WHERE leave_notice_ID = ?`;
      const results = await database_query(sqlQuery, [leave_notice_ID]);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
