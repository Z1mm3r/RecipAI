import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Recipe } from './entities'

import http from 'http'

import GptApi from "./API/ChatGptApi"

require('dotenv').config();



export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    recipeRepository: EntityRepository<Recipe>,
    server: http.Server;
}

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

//MIKRO-ORM STUFF?
export const init = (async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>({
        metadataProvider: TsMorphMetadataProvider,
        entitiesTs: ['./server/entities/*.ts']
    });
    DI.em = DI.orm.em;
    DI.recipeRepository = DI.orm.em.getRepository(Recipe);
    DI.server = app.listen(process.env.PORT || 3002, () => {

    })
})


