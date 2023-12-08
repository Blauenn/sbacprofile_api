import dotenv from "dotenv";
// Services //
import { database_query } from "../database.service";

dotenv.config();

// Get all //
export const clubMembership_getAll = async () => {
  const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_CLUB_MEMBERSHIP}`;
  return database_query(sqlQuery);
};

// Create //
export const clubMembership_createOne = async (object: any) => {
  const columns = ["club_membership_club_ID", "club_membership_student_ID"];
  const values = columns.map((column) => object[column]);
  const placeholders = new Array(values.length).fill("?").join(", ");

  const sql = `INSERT INTO ${
    process.env.DB_TABLE_CLUB_MEMBERSHIP
  } (${columns.join(", ")}) VALUES (${placeholders})`;

  return database_query(sql, values);
};

// Update //
export const clubMembership_updateOne = async (
  club_membership_ID: number,
  object: any
) => {
  const allowedColumns = [
    "club_membership_club_ID",
    "club_membership_student_ID",
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

  const query = `UPDATE ${
    process.env.DB_TABLE_CLUB_MEMBERSHIP
  } SET ${columns.join(", ")} WHERE club_membership_ID = ?`;
  return database_query(query, [...values, club_membership_ID]);
};

// Delete //
export const clubMembership_deleteOne = async (object: any) => {
  const columns = ["club_membership_club_ID", "club_membership_student_ID"];
  const values = columns.map((column) => object[column]);

  const query = `DELETE FROM ${
    process.env.DB_TABLE_CLUB_MEMBERSHIP
  } WHERE ${columns.join(" = ? AND ")} = ?`;

  return database_query(query, [...values]);
};
