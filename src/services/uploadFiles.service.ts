import dotenv from "dotenv";
import ftp from "ftp";
// Configs //
import { database_config } from "../configs/database.config";

dotenv.config();

export const uploadFiles_uploadFile = (filePath: string, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a new FTP client //
      const client = new ftp();

      // Connect to the FTP server //
      client.connect(database_config.ftpConfig);

      // Upload the file //
      client.on("ready", () => {
        client.put(data, filePath, (error: any) => {
          if (error) {
            console.error("Error uploading file:", error);
            resolve({ error: "Error uploading file to FTP server" });
          } else {
            // Close the FTP connection after the upload //
            client.end();
            resolve({ message: "File uploaded successfully" });
          }
        });
      });

      client.on("error", (error: any) => {
        console.error("FTP connection error:", error);
        reject({ error: "FTP connection error" });
      });
    } catch (error) {
      reject(error);
    }
  });
};
