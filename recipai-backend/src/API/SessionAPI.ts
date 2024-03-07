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

        this.app.post('/login', async (req, res) => {

            if (req.session.auth) {
                console.log("Already Logged in")
            }

            else {
                const loggedIn = await this.userController.login(req, res)
                if (!loggedIn) {
                    console.log("Error loggin in")
                }
                res.json({ loggedIn: true, username: req.body.userName })
            }


        })

        this.app.get('/logout', async (req: express.Request, res) => {

            //@ts-ignore
            console.log(req.session.auth)
            //@ts-ignore
            req.session.destroy((err) => {
                if (err) {
                    console.log("error logging out")
                    return res.status(500).send('Could not log out, please try again');
                }
                else {
                    console.log("logged out")
                    return res.status(200).send('Logged Out')
                }
            });
        })

    }

}

export default SessionAPI