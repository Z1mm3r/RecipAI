import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User, UserDetails } from "../entities";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { DI } from "../interfaces";

type userFields = "userName" | "bio" | "profilePicture" | "id";


class UserController {
    DI: DI;


    constructor(DI: DI) {
        this.DI = DI;
    }

    async createNewUser(req: Request) {
        if (req.body.userName && req.body.email && req.body.password) {
            const newUser = new User(req.body.userName, req.body.email);
            let generatedHash;
            await bcrypt.hash(req.body.password, 3).then(hash => {
                generatedHash = hash;
            }).catch(err => console.log("error"))

            const newDetails = new UserDetails(generatedHash)
            newUser.details = newDetails;
            await this.DI.orm.em.persistAndFlush([newUser]);
            return newUser.id;
        }
        else {
            return -1;
        }
    }

    async getUser(id: string, fields: userFields[], res?: Response) {
        try {
            const user = await this.DI.userRepository.findOneOrFail(Number(id), { fields: [...fields] })
            return user;
        }
        catch (e: any) {
            if (res) {
                res.status(400).json({ message: e.message })
            }
            return null;
        }
    }


    async handleCreationRequest(req: Request, res: Response) {
        let value = await this.createNewUser(req);
        res.json({ message: value });
    }

    async handlePublicUserRequest(req: Request, res: Response) {
        let user = await this.getUser(req.params.id, ['userName', 'profilePicture', 'bio', 'id']);
        res.json(user)
    }
}

export default UserController