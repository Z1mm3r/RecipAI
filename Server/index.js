const express = require("express");

const ChatGptApi = require('./API/ChatGptApi');

require('dotenv').config();



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); // Used to add req.body

const api = new ChatGptApi(app, PORT);

api.setupListeners();
api.setupEndpoints();

