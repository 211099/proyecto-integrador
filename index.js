import { api } from "./config/config.js";
import swaggerDocs from "./config/swagger.config.js";
import data from "./routes/data.routes.js";
import express from "express";


const app = express();
import fs  from "fs";
import https from "https";

app.use(express.json());

// ROUTERS
app.use("/api/data", data);

// app.use('/api/profile', middleware, profile);

// SERVIDOR ACTIVO
https.createServer({
  cert: fs.readFileSync('server.cer'),
  key: fs.readFileSync('server.key')
}, app).listen(api.port, () => {
  console.log(`Servidor corriento en el puerto => ${api.port}`);
  swaggerDocs(app, api.port);
});