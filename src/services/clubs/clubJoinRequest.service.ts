import dotenv from "dotenv";
import dayjs from "dayjs";
// Services //
import { database_query } from "../database.service";

dotenv.config();

// Get all //
export const clubJoinRequest_getAll = () => {
  const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_CLUB_JOIN_REQUEST}`;
  return database_query(sqlQuery);
};

// Create //
export const clubJoinRequest_createOne = (object: any) => {
  object.club_join_request_create_datetime = dayjs().toISOString();

  const columns = [
    "club_join_request_status",
    "club_join_request_club_ID",
    "club_join_request_student_ID",
    "club_join_request_create_datetime",
  ];
  const values = columns.map((column) => object[column]);
  const placeholders = new Array(values.length).fill("?").join(", ");

  const sqlQuery = `INSERT INTO ${
    process.env.DB_TABLE_CLUB_JOIN_REQUEST
  } (${columns.join(", ")}) VALUES (${placeholders})`;
  return database_query(sqlQuery, values);
};

// Update //
export const clubJoinRequest_updateOne = (
  club_join_request_ID: number,
  object: any
) => {
  object.club_join_request_status_change_datetime = dayjs().toISOString();

  const allowedColumns = [
    "club_join_request_status",
    "club_join_request_status_change_datetime",
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
    process.env.DB_TABLE_CLUB_JOIN_REQUEST
  } SET ${columns.join(", ")} WHERE club_join_request_ID = ?`;
  return database_query(sqlQuery, [...values, club_join_request_ID]);
};

// Delete //
export const clubJoinRequest_deleteOne = (club_join_request_ID: number) => {
  const sqlQuery = `DELETE FROM ${process.env.DB_TABLE_CLUB_JOIN_REQUEST} WHERE club_join_request_ID = ?`;
  return database_query(sqlQuery, [club_join_request_ID]);
};
