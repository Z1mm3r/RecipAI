import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User, UserDetails } from "../entities";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'

class UserController {
    orm: MikroORM;

    constructor(orm: MikroORM) {
        this.orm = orm;
    }

    async createNewUser(req: Request) {
        console.log(req.body)
        if (req.body.userName && req.body.email && req.body.password) {
            const newUser = new User(req.body.userName, req.body.email);
            let generatedHash;
            await bcrypt.hash(req.body.password, 3).then(hash => {
                generatedHash = hash;
                console.log("hashing")
            }).catch(err => console.log("error"))

            console.log("hashing done")
            console.log(generatedHash)

            const newDetails = new UserDetails(generatedHash)
            console.log(newDetails)
            newUser.details = newDetails;
            await this.orm.em.persistAndFlush([newUser]);
            return newUser.id;
        }
        else {
            return -1;
        }
    }


    async handleCreationRequest(req: Request, res: Response) {
        let value = await this.createNewUser(req);
        res.json({ message: value });
    }
}

export default UserController