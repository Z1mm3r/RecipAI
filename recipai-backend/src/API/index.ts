import express = require('express')

import { setupChatGptEndpoints } from './ChatGptApi';
import DatabaseAPI from './DatabaseAPI';
import { DI } from '../interfaces';
import SessionAPI from './SessionAPI';
import { Session } from 'inspector';

const GptResponse = require('./GptPrompt');

class API {
    host: string;
    app: express.Application;
    port: number;
    GptResponse: any;
    server: any;
    databaseAPI: DatabaseAPI;
    databaseInterface: DI;
    sessionAPI: SessionAPI;

    //ADD DI CODE HERE? OR ADD A REFERENCE BACK TO SERVER STUFF.

    constructor(app, port, host, DI: DI) {
        this.host = host;
        this.app = app;
        this.port = port;
        this.GptResponse = new GptResponse();
        this.databaseAPI = new DatabaseAPI(app, DI);
        this.sessionAPI = new SessionAPI(app, this.databaseAPI.userController, this.databaseAPI.userDetailsController)
        this.databaseInterface = DI;
    }
    setupListeners() {
        this.server = this.app.listen(this.port, this.host, () => {
            console.log(`Server is hosted on ${this.host}`)
            console.log(`Server is listening on ${this.port}`);
        });
    }

    setupEndpoints() {
        setupChatGptEndpoints(this);
        this.databaseAPI.setupDatabaseEndpoints()
        this.sessionAPI.setupSessionEndpoints()
    }
}

export default API