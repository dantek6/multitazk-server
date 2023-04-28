import express from "express";
import cors from "cors";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import indexRoutes from "./routes/index.routes";
const { run } = require('./database');

const app = express();

app.use(indexRoutes);

env.config();

app.use(express.urlencoded({ extended: true}))
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
    res.send("Lista de usuarios:")
});

run().catch((err: Error) => {
  console.error('An error occurred:', err);
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

