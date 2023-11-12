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
            res.json({ message: "return all users" });
        });
        this.app.get("/api/users/:id", async (req, res) => {
            await this.userController.handlePublicUserRequest(req, res);
            res.json({ message: "return specific user" });
        });
        this.app.delete("/api/users", (req, res) => {
            res.json({ message: "delete" });
        });
        this.app.post("/api/users", async (req, res) => {
            console.log(req.body);
            await this.userController.handleCreationRequest(req, res);
            //res.json({ message: "create new user" });
        })
        this.app.post("/api/users/:id", (req, res) => {
            res.json({ message: "update user" });
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