import express = require('express')
import UserController from '../controllers/userController';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { DI } from "../interfaces";

class DatabaseAPI {

    app: express.Application;
    userController: UserController;
    DI: DI;

    constructor(app: express.Application, DI: DI) {
        this.app = app;
        this.DI = DI;
        this.userController = new UserController(DI)
    }

    setupDatabaseEndpoints() {
        this.setupUserEndpoints();
        this.setupRecipeEndpoints();
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
        this.app.patch("/api/users/:id", (req, res) => {
            this.userController.handleUserUpdateRequest(req, res)
        });
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