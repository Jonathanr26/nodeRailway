import express from "express";
import { createPool } from "mysql2/promise";

const pool = createPool({
  user: "root",
  password: "azxohjFLjraihqHy6LHA",
  host: "containers-us-west-117.railway.app",
  port: 6587,
  database: "railway",
});

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido a este servidor..");
});

app.get("/users", async (req, res) => {
  const [result] = await pool.query("select * from users");
  res.json(result);
});

app.get("/agregarusuario", async (req, res) => {
  const nombre = req.query.nombre;
  const contrasena = req.query.contrasena;
  const correo = req.query.correo;
  const [result] = await pool.query(
    `INSERT INTO usuario (nombre, contrasena, correo) VALUES ('${nombre}', '${contrasena}', '${correo}')`
  );
  res.json(result[0]);
});

app.listen(process.env.PORT || 3000);

console.log("Servidor corriendo en el puerto 3000");
