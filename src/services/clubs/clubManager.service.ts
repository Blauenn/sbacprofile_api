import dotenv from "dotenv";
// Services //
import { database_query } from "../database.service";

dotenv.config();

// Get all //
export const clubManager_getAll = async () => {
  const sqlQuery = `SELECT * FROM ${process.env.DB_TABLE_CLUB_MANAGER}`;
  return database_query(sqlQuery);
};

// Create //
export const clubManager_createOne = async (object: any) => {
  const columns = ["club_manager_club_ID", "club_manager_teacher_ID"];
  const values = columns.map((column) => object[column]);
  const placeholders = new Array(values.length).fill("?").join(", ");

  const sqlQuery = `INSERT INTO ${
    process.env.DB_TABLE_CLUB_MANAGER
  } (${columns.join(", ")}) VALUES (${placeholders})`;
  return database_query(sqlQuery, values);
};
// Create multiple //
export const clubManager_createMultiple = async (
  club_ID: number,
  clubManagers: []
) => {
  const columns = ["club_manager_club_ID", "club_manager_teacher_ID"];

  const promises = clubManagers.map((clubManager) => {
    const values = [club_ID, clubManager];
    const placeholders = new Array(values.length).fill("?").join(", ");
    const sqlQuery = `INSERT INTO ${
      process.env.DB_TABLE_CLUB_MANAGER
    } (${columns.join(", ")}) VALUES (${placeholders})`;

    return database_query(sqlQuery, values);
  });

  return Promise.all(promises);
};

// Update //
export const clubManager_updateOne = async (
  club_manager_ID: number,
  object: any
) => {
  const allowedColumns = ["club_manager_club_ID", "club_manager_teacher_ID"];
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
    process.env.DB_TABLE_CLUB_MANAGER
  } SET ${columns.join(", ")} WHERE club_manager_ID = ?`;
  return database_query(sqlQuery, [...values, club_manager_ID]);
};

// Delete //
export const clubManager_deleteOne = async (club_ID: number) => {
  const sqlQuery = `DELETE FROM ${process.env.DB_TABLE_CLUB_MANAGER} WHERE club_manager_ID = ?`;
  return database_query(sqlQuery, [club_ID]);
};
// Delete multiple //
export const clubManager_deleteMultiple = async (
  club_ID: number,
  clubManagers: []
) => {
  const promises = clubManagers.map((clubManager) => {
    const values = [club_ID, clubManager];
    const sqlQuery = `DELETE FROM ${process.env.DB_TABLE_CLUB_MANAGER} WHERE club_manager_club_ID = ? AND club_manager_teacher_ID = ?`;

    return database_query(sqlQuery, values);
  });

  return Promise.all(promises);
};
