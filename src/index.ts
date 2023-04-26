import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import indexRoutes from "./routes/index.routes";
import './database';

const app = express();

app.use(indexRoutes);

env.config();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const config = new Configuration({
    //organization: "org-iZTG3fUXueYaxrLsiOaBuhJf",
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

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
