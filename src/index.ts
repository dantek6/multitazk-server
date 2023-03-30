import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';

const app = express();

env.config();

app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    // organization: "org-iZTG3fUXueYaxrLsiOaBuhJf",
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config);

// app.get('/', async (req, res) => {
//     res.send("Hello WorldAAH");
// });

app.post('/chat', async (req, res) => {
    const {prompt} = req.body

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 512,
        temperature: 0
    })
    res.send(response.data.choices[0].text)
    // res.json({message: response.data.choices[0].text})


});

const PORT = 8080;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));