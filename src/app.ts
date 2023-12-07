import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./configs/swagger.config";

dotenv.config();

const app = express();
const port = 80;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://blauens.com",
      "https://sbacprofile.blauens.com",
      "http://blauenthepeople.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(require("./routes"));

const server = app.listen(process.env.SERVER_PORT, () => {
  const address = server.address();

  if (address && typeof address !== "string") {
    let port = address.port;
    console.log(`Server is running at PORT ${port}`);
  } else {
    console.log(`Server is running, but unable to determine the PORT`);
  }

  const sql = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

  console.log(`${JSON.stringify(sql)}`);
});
