require('dotenv').config();

import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import 'reflect-metadata';
import { RequestContext } from "@mikro-orm/core/utils";
import config from '../mikro-orm.config'

import { Recipe, UserDetails } from './entities'
import { User } from './entities'

import http from 'http'

import GptApi from "./API/ChatGptApi"





export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>,
    userDetailsRepository: EntityRepository<UserDetails>,
    recipeRepository: EntityRepository<Recipe>,
    server: http.Server;
}

const express = require("express");

const cors = require('cors')

const PORT = process.env.PORT || 3001;
const DBPORT = process.env.DBPORT || 3002;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();

//Mikro-ORM
// app.use((req, res, next) => {
//     RequestContext.create(orm.em, next);
// })

app.set('host', HOST);

app.use(cors())
app.use(express.json()); // Used to add req.body

const api = new GptApi(app, PORT, HOST);

api.setupListeners();
api.setupEndpoints();

console.log(config.dbName)

//MIKRO-ORM STUFF?
export const init = (async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
    DI.em = DI.orm.em;
    DI.recipeRepository = DI.orm.em.getRepository(Recipe);
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.userDetailsRepository = DI.orm.em.getRepository(UserDetails);
    DI.server = app.listen(DBPORT, () => {
        console.log(`MikroORM is listening at  ${HOST}:${DBPORT}`);
    })
})();


