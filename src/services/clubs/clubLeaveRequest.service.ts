import dotenv from "dotenv";
import dayjs from "dayjs";
// Services //
import { database_query } from "../database.service";

dotenv.config();

// Get all //
export const clubLeaveRequest_getAll = () => {
  const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_CLUB_LEAVE_REQUEST}`;
  return database_query(sqlQuery);
};

// Create //
export const clubLeaveRequest_createOne = (object: any) => {
  object.club_leave_request_create_datetime = dayjs().toISOString();

  const columns = [
    "club_leave_request_status",
    "club_leave_request_club_ID",
    "club_leave_request_student_ID",
    "club_leave_request_create_datetime",
  ];
  const values = columns.map((column) => object[column]);
  const placeholders = new Array(values.length).fill("?").join(", ");

  const sqlQuery = `INSERT INTO ${
    process.env.DB_TABLE_CLUB_LEAVE_REQUEST
  } (${columns.join(", ")}) VALUES (${placeholders})`;
  return database_query(sqlQuery, values);
};

// Update //
export const clubLeaveRequest_updateOne = (
  club_leave_request_ID: number,
  object: any
) => {
  object.club_leave_request_status_change_datetime = dayjs().toISOString();

  const allowedColumns = [
    "club_leave_request_status",
    "club_leave_request_status_change_datetime",
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
    return Promise.reject(new Error("No columns to update."));
  }

  const sqlQuery = `UPDATE ${
    process.env.DB_TABLE_CLUB_LEAVE_REQUEST
  } SET ${columns.join(", ")} WHERE club_leave_request_ID = ?`;
  return database_query(sqlQuery, [...values, club_leave_request_ID]);
};

// Delete //
export const clubLeaveRequest_deleteOne = (club_leave_request_ID: number) => {
  const sqlQuery = `DELETE FROM ${process.env.DB_TABLE_CLUB_LEAVE_REQUEST} WHERE club_leave_request_ID = ?`;
  return database_query(sqlQuery, [club_leave_request_ID]);
};
