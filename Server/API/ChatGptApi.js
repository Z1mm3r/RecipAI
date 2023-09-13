
const GptPrompt = require('./GptPrompt');

class ChatGptApi {
    constructor(app, port) {
        this.app = app;
        this.port = port;
        this.gptPrompt = new GptPrompt();
    }

    setupListeners() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on ${this.port}`);
        });
    }

    setupEndpoints() {
        this.app.get("/api", (req, res) => {
            res.json({ message: "Class based endpoint check" });
        });

        this.app.post("/api/recipe", async (req, res) => {
            console.log(req.body.text)
            let response = await this.gptPrompt.sendRequest(req.body.text);
            console.log('got chatgpt response')
            res.send(response);
        })

    }
}

module.exports = ChatGptApi;