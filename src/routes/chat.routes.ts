import env from "dotenv";
import { Router } from 'express';
import { Configuration, OpenAIApi } from "openai";

const router = Router();

env.config();

router.post("/chat", async (req, res) => {
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

  export default router;