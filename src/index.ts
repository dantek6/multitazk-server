import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

const config = new Configuration({
    organization: "org-iZTG3fUXueYaxrLsiOaBuhJf",
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config);

app.listen("3080", ()=> console.log("Listening on port 3080"));

app.get('/', async (req, res) => {
    res.send("Hello WorldAAH");
});

app.post('/', async (req, res) => {
    const {message} = req.body

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})

    } catch (error) {
        console.log(error)
        res.send(error).status(400)
    }
})