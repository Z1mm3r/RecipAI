import express from 'express'

import UserDetailsController from '../controllers/userDetailsController';
import UserController from '../controllers/userController';

class SessionAPI {
    app: express.Application;
    userController: UserController;
    userDetailsController: UserDetailsController;

    constructor(app: express.Application, userController: UserController, userDetailsController: UserDetailsController) {
        this.app = app;
        this.userController = userController;
        this.userDetailsController = userDetailsController;
    }

    setupSessionEndpoints() {

        this.app.post('/login', async (req: express.Request, res) => {
            //@ts-ignore
            req.session
            const loggedIn = await this.userController.login(req, res)
            if (!loggedIn) {
                console.log("Error loggin in")
            }
            res.json({ loggedIn: true, username: req.body.userName })
        })
    }

}

export default SessionAPI