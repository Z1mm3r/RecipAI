import GptApi from "./API/ChatGptApi"

require('dotenv').config();


const express = require("express");
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();

app.set('host', HOST);

app.use(cors())
app.use(express.json()); // Used to add req.body

const api = new GptApi(app, PORT, HOST);

api.setupListeners();
api.setupEndpoints();

