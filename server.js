//use npm to install express and openai packages

const express = require('express');
const app = express();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey:''});

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            //changes the role to system and content to make the chatbot act like Yoda.
            { role: "system", content: "You are Yoda." },
            //takes in user input
            { role: "user", content: userInput }
        ],
    });

    res.json({ message: response.choices[0].message.content });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
