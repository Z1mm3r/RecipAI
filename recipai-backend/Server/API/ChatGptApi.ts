import express = require('express')

const GptResponse = require('./GptPrompt');

class ChatGptApi {

    host: string;
    app: express.Application;
    port: number;
    GptResponse: any;

    constructor(app, port, host) {
        this.host = host;
        this.app = app;
        this.port = port;
        this.GptResponse = new GptResponse();
    }

    setupListeners() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Server is hosted on ${this.host}`)
            console.log(`Server is listening on ${this.port}`);
        });
    }

    setupEndpoints() {
        this.app.get("/api", (req, res) => {
            res.json({ message: "Class based endpoint check" });
        });

        this.app.post("/api/recipePrompt", async (req, res) => {
            console.log(req.body.text)
            let response = await this.GptResponse.sendRequest(req.body.text);
            console.log('got chatgpt response')
            res.send(response);
        })

    }

}

export = ChatGptApi;