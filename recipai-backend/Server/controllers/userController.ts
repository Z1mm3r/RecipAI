import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { wrap } from '@mikro-orm/core'
import { User, UserDetails } from "../entities";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { DI } from "../interfaces";

import { patchProps, trimFields } from "../utils";
import UserDetailsController from "./userDetailsController";
import { populate } from "dotenv";

type userFields = "userName" | "bio" | "profilePicture" | "id";
const patchFields = ["userName", "bio", "profilePicture"];

type privateFields = "details";
type detailFields = "id" | "firstName" | "lastName"

class UserController {
    DI: DI;
    userDetailController: UserDetailsController;

    constructor(DI: DI, userDetailController: UserDetailsController) {
        this.DI = DI;
        this.userDetailController = userDetailController;
    }

    // stringToFields(string: string[]): userFields[] {
    //     const output: userFields[] = []
    //     string.forEach(element => {
    //         if (e)
    //     });
    // }

    private async createNewUser(req: Request) {
        if (req.body.userName && req.body.email && req.body.password) {
            const newUser = new User(req.body.userName, req.body.email);
            let generatedHash;
            await bcrypt.hash(req.body.password, 3).then(hash => {
                generatedHash = hash;
            }).catch(err => console.log("error"))

            const newDetails = new UserDetails(generatedHash, req.body?.firstName ?? null, req.body?.lastName ?? null)
            console.log(newDetails)

            newUser.details = newDetails;
            await this.DI.orm.em.persistAndFlush([newUser]);
            return newUser.id;
        }
        else {
            return -1;
        }
    }

    private async updateUser(req: Request, res: Response) {

        //Make sure we only use accetable props
        const updateSet = patchProps(req.body, patchFields)

        //get reference to user, and update
        const userToUpdate = this.DI.em.getReference(User, Number(req.params.id))
        wrap(userToUpdate).assign({
            ...updateSet
        })

        //commit update to DB
        await this.DI.em.flush()

        //Retrieve now udpated user.
        let updatedUser = await this.getUser(req.params.id, Object.keys(updateSet) as userFields[], res)

        //Since entity is already in our identity manager, will come back with extra fields. Trim them for output.
        let output = trimFields(updatedUser, Object.keys(updateSet))
        res.json({ message: output })

    }

    private async getUser(id: string, fields?: userFields[], res?: Response) {
        console.log("get user")
        console.log(fields)
        console.log([...fields])
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

    async handleDeleteUserRequest(req: Request, res: Response) {
        //TODO authenticate we are allowed to delete.

        console.log(`Deleting ${req.params.id}`)
        let number: number = Number(req.params.id)

        //NaN? error out.
        if (isNaN(number)) {
            res.status(400).json({ message: "Error, id given is NaN" })
            return;
        }
        //Once authenticated, delete user.
        const user = await this.DI.userRepository.findOne(Number(req.params.id))

        //TODO create specific delete that also cleans up user details?
        await this.DI.em.removeAndFlush(user);
        res.json({
            message: `Deleted ${req.params.id}`
        })
    }

    async handlePublicUsersRequest(req: Request, res: Response) {
        //Get and return all users.
        const users = await this.DI.userRepository.findAll({ fields: ["id", "userName"] })
        res.json({ users: users })
    }

    async handleUserUpdateRequest(req: Request, res: Response) {
        //TODO handle authentication, must be allowed to update this user.

        await this.updateUser(req, res);

    }

    ////////////userDetails CRUD
    private async serverGetUserDetailsViaUser(id: number, fields?: detailFields[]) {
        let selectedFields = [""]
        const user = await this.DI.userRepository.findOneOrFail(Number(id), { populate: ["details"] })
        console.log(user.details)
        let output = {};
        if (fields) {
            for (let i in fields) {
                output[fields[i]] = user.details[fields[i]]
            }
        }
        else {
            output = { firstName: user.details.firstName, lastName: user.details.lastName }
        }
        return output
    }
    async getUserDetailsViaUser(req: Request, fields?: detailFields[]) {
        //TODO Authenticate

        let details = await this.serverGetUserDetailsViaUser(Number(req.params.id), fields);
        return details
    }

    async handleUserDetailsRequest(req: Request, res: Response) {
        let details = await this.getUserDetailsViaUser(req);
        res.json({ userDetails: details })
    }
}

export default UserController