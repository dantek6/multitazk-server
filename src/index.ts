import express from "express";
import cors from "cors";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import TaskWriteModel from "./models/TaskWrite";
import UserModel from "./models/Users";

import indexRoutes from "./routes/index.routes";
const { run } = require("./database");

const app = express();

app.use(indexRoutes);

env.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Conectar a la API de OPENAI
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    max_tokens: 512,
    temperature: 0,
  });
  res.send(response.data.choices[0].text);
  // res.json({message: response.data.choices[0].text})
});

//Crear Rutas Usuarios:
app.get("/users", (req, res) => {
  res.send("Lista de usuarios:");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Rellenar datos del modelo:
const taskWrite = new TaskWriteModel({
  // id: "1",
  title: "Tarea 1",
  description: "Descripción de la tarea 1",
  date: new Date(),
  timeMin: 10,
  groupId: "1",
  lengthMin: 10,
  points: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const user = new UserModel({
  id: "1",
  name: "Usuario 1",
  email: "jondoe@gmail.com",
  password: "123456",
  createdAt: new Date(),
  updatedAt: new Date(),
  groups: [
    {
      groupId: "1",
      isAdmin: true,
      level: 1,
      experience: 0,
    },
    {
      groupId: "2",
      isAdmin: false,
      level: 1,
      experience: 0,
    },
  ],
  taskId: ["1", "2", "3", "4", 5],
});

// console.log(taskWrite);
console.log(user);

//Capturar error de Base de Datos si hay
run().catch((err: Error) => {
  console.error("An error occurred:", err);
});
