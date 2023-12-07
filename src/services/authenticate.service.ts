import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
// Configs //
import { secret_config } from "../configs/app.config";
// Services //
import { database_query } from "./database.service";

export const login = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const columns = ["user_role", "user_role_ID", "user_password"];
    const query = `SELECT ${columns.join(", ")} FROM ${
      process.env.DB_TABLE_USER
    } WHERE user_email = ?`;

    database_query(query, [email])
      .then((result) => {
        const rows = result as RowDataPacket[];

        if (rows.length === 1) {
          const passwordIsValid = bcrypt.compareSync(
            password,
            rows[0].user_password
          );
          if (!passwordIsValid) {
            reject("Invalid Password!");
          }
          const token = jwt.sign(
            {
              user_role: rows[0].user_role,
              user_role_ID: rows[0].user_role_ID,
            },
            secret_config,
            {
              algorithm: "HS256",
              allowInsecureKeySizes: true,
              expiresIn: 86400,
            }
          );
          resolve(token);
        } else {
          reject("Email not found.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const change_password = (id: number, password: string) => {
  return new Promise((resolve, reject) => {
    let hashPassword;
    bcrypt.hash(password, 12).then((hashedPassword) => {
      hashPassword = hashedPassword;
      const query = `UPDATE ${process.env.DB_TABLE_USER} SET user_password = ? WHERE user_role_ID = ?`;
      database_query(query, [hashPassword, id])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
