import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SBAC Profile API",
      version: "1.0.0",
      description: "API documentation for SBAC Profile API App",
    },
  },
  apis: [
    "./routes/api/student.js",
    "./routes/api/teacher.js",
    "./routes/api/club.js",
    "./routes/api/club-membership.js",
    "./routes/api/auth.js",
    "./routes/api/request-form.js",
    "./routes/api/announcement.js",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
