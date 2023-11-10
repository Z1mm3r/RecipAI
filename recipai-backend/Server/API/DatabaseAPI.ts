import express = require('express')
import UserController from '../controllers/userController';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';

class DatabaseAPI {

    app: express.Application;
    userController: UserController;
    orm: MikroORM;

    constructor(app: express.Application, orm: MikroORM) {
        this.app = app;
        this.orm = orm;
        this.userController = new UserController(orm)
    }

    setupDatabaseEndpoints() {
        this.setupUserEndpoints();
        this.setupRecipeEndpoints();
    }

    setupUserEndpoints() {
        this.app.get("/api/users", (req, res) => {
            res.json({ message: "return all users" });
        });
        this.app.get("/api/users/:id", (req, res) => {
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