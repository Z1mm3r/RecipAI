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
            console.log("Attempting Login:")
            if (req.session.auth) {
                console.log("Already Logged in")
                res.send("Already Logged In")
            }

            else {
                const loggedIn = await this.userController.login(req, res)
                if (!loggedIn && loggedIn != null) {
                    console.log("Error logging in (wrong password / username)")
                    res.status(401).send("Incorrect username or password.")
                }
                else if (loggedIn == null) {
                    console.log("Invalid log in attempt.")
                }
                else {

                    console.log("User Logged in")
                    res.json({ loggedIn: true, username: req.body.userName })
                }

            }


        })

        this.app.post('/logout', async (req: express.Request, res) => {

            if (req.session.auth) {
                req.session.destroy((err) => {
                    if (err) {
                        console.log("error logging out (error destroying session)")
                        return res.status(500).send('Could not log out, please try again');
                    }
                    else {
                        console.log("logged out")
                        return res.status(200).send('Logged Out')
                    }
                });
            }
            else {
                console.log("Cannot log out: Not logged in")
                return res.status(205).send("Not logged in")
            }

        })

    }

}

export default SessionAPI