require('dotenv').config();

import { EntityManager, EntityRepository, RequestContext } from "@mikro-orm/core";
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import 'reflect-metadata';
import config from '../mikro-orm.config'

import { Recipe, UserDetails } from './entities'
import { User } from './entities'

import http from 'http'
import API from "./API";
import { DI } from "./interfaces";

const DI = {} as DI;

const express = require("express");

const cors = require('cors')

const PORT = process.env.PORT || 3001;
const DBPORT = process.env.DBPORT || 3002;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();

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

    app.use((req, res, next) => {
        RequestContext.create(DI.orm.em, next)
    })

    app.set('host', HOST);
    app.use(cors())
    app.use(express.json()); // Used to add req.body

    const api = new API(app, PORT, HOST, DI);

    api.setupListeners();
    api.setupEndpoints();
    console.log(config.dbName)

})();






