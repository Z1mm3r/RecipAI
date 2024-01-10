import express = require('express')
import UserController from '../controllers/userController';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DI } from "../interfaces";
import UserDetailsController from '../controllers/userDetailsController';

class DatabaseAPI {

    app: express.Application;
    userController: UserController;
    userDetailsController: UserDetailsController;
    DI: DI;

    constructor(app: express.Application, DI: DI) {
        this.app = app;
        this.DI = DI;
        this.userDetailsController = new UserDetailsController(DI,)
        this.userController = new UserController(DI, this.userDetailsController)
    }

    setupDatabaseEndpoints() {
        this.setupUserEndpoints();
        this.setupRecipeEndpoints();
        this.setupDetailEndpoints();
    }

    setupUserEndpoints() {
        this.app.get("/api/users", (req, res) => {
            this.userController.handlePublicUsersRequest(req, res)
        });
        this.app.get("/api/users/:id", async (req, res) => {
            await this.userController.handlePublicUserRequest(req, res);
        });
        this.app.delete("/api/users/:id", async (req, res) => {
            await this.userController.handleDeleteUserRequest(req, res);
        });
        this.app.post("/api/users", async (req, res) => {
            await this.userController.handleCreationRequest(req, res);
        })
        this.app.patch("/api/users/:id", async (req, res) => {
            await this.userController.handleUserUpdateRequest(req, res)
        });
    }

    setupDetailEndpoints() {
        this.app.get("/api/users/:id/details", async (req, res) => {
            //TODO authenticate
            console.log("ding")
            await this.userController.handleUserDetailsRequest(req, res)
        })
    }

    setupRecipeEndpoints() {
        this.app.get("/api/recipes", (req, res) => {
            res.json({ message: "return all recipes" });
        });
        this.app.get("/api/recipes/:id", (req, res) => {
            res.json({ message: "return specific recipes" });
        });
        this.app.delete("/api/recipes", (req, res) => {
            res.json({ message: "delete recipe" });
        });
        this.app.post("/api/recipes", (req, res) => {
            res.json({ message: "create new recipe" });
        })
        this.app.post("/api/recipes/:id", (req, res) => {
            res.json({ message: "update recipe" });
        });
    }
}

export default DatabaseAPI