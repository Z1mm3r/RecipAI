import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { wrap } from '@mikro-orm/core'
import { User, UserDetails } from "../entities";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { DI } from "../interfaces";

import { patchProps, trimFields } from "../utils";

type userDetailsFields = "firstName" | "lastName" | "password" | "id";
const patchFields = ["firstName", "lastName", "password"];

class UserDetailsController {
    DI: DI;


    constructor(DI: DI) {
        this.DI = DI;
    }

    private async updateUserDetails(req: Request, res: Response) {
        const updateSet = patchProps(req.body, patchFields)

        const detailsToUpdate = this.DI.em.getReference(UserDetails, Number(req.params.id))
        wrap(detailsToUpdate).assign({
            ...updateSet
        })

        await this.DI.em.flush()

        let updatedUserDetails = await this.getUserDetails(req.params.id, Object.keys(updateSet) as userDetailsFields[], res)
        let output = trimFields(updatedUserDetails, Object.keys(updateSet))
        res.json({ message: output })
    }

    private async getUserDetails(id: string, fields?: userDetailsFields[], res?: Response) {
        try {
            const userDetails = await this.DI.userDetailsRepository.findOneOrFail(Number(id), { fields: [...fields] })
            return userDetails;
        }
        catch (e: any) {
            if (res) {
                res.status(400).json({ message: e.message })
            }
            return null;
        }
    }

    async handleUserDetailUpdateRequest(req: Request, res: Response) {
        //TODO Authenticate
        await this.updateUserDetails(req, res)
    }

}

export default UserDetailsController