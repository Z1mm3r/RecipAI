const { Configuration, OpenAIApi } = require("openai");

class GptPrompt {

    constructor() {
        this.configuration = new Configuration({
            apiKey: process.env.CHAT_GPT_KEY,
        })
        this.chatGpt = new OpenAIApi(this.configuration);
    }

    async sendRequest(text) {
        const response = await this.chatGpt.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": text
                }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        console.log(response);
        console.log("We are returning to frontend:")
        console.log(response.data.choices[0].message.content)
        console.log(typeof response.data.choices[0].message.content)
        return response.data.choices[0].message.content;
    }
}


// async sendRequest(text) {
//     const response = await this.chatGpt.createCompletion({
//         model: "text-davinci-003",
//         prompt: text,
//         temperature: 1,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     })
//     console.log(response);
//     console.log(response.data.choices[0].text)
//     return response;
// }
module.exports = GptPrompt;