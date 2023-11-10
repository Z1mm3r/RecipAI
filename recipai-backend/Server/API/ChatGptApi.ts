import express = require('express')
import API from '.';

const GptResponse = require('./GptPrompt');



export const setupChatGptEndpoints = (api: API) => {
    api.app.get("/api", (req, res) => {
        res.json({ message: "Class based endpoint check" });
    });

    api.app.post("/api/recipePrompt", async (req, res) => {
        console.log(req.body.text)
        let response = await api.GptResponse.sendRequest(req.body.text);
        console.log('got chatgpt response')
        res.send(response);
    })
}


