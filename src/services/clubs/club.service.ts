// Services //
import { database_query } from "../database.service";
// Constants //
import { club_columns } from "../../constants/clubs/club.constant";

// Get all //
export const club_getAll = async () => {
  const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_CLUB}`;
  return database_query(sqlQuery);
};

// Create //
export const club_createOne = (object: any) => {
  const columns = club_columns;
  const values = columns.map((column) => object[column]);
  const placeholders = new Array(values.length).fill("?").join(", ");

  const sqlQuery = `INSERT INTO ${process.env.DB_TABLE_CLUB} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;
  return database_query(sqlQuery, values);
};

// Update //
export const club_updateOne = async (club_ID: number, object: any) => {
  const allowedColumns = club_columns;
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

  const sqlQuery = `UPDATE ${process.env.DB_TABLE_CLUB} SET ${columns.join(
    ", "
  )} WHERE club_ID = ?`;
  return database_query(sqlQuery, [...values, club_ID]);
};

// Delete //
export const club_deleteOne = (club_ID: number) => {
  const sqlQuery = `DELETE FROM ${process.env.DB_TABLE_CLUB} WHERE club_ID = ?`;
  return database_query(sqlQuery, [club_ID]);
};
