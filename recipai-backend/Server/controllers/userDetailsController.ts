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

    private async updateDetails(id: number, fields, res?) {
        const updateSet = patchProps(fields, patchFields)
        const detailsToUpdate = this.DI.em.getReference(UserDetails, Number(id))
        wrap(detailsToUpdate).assign({
            ...updateSet
        })

        await this.DI.em.flush()
        let updatedUserDetails = await this.getUserDetails(id, Object.keys(updateSet) as userDetailsFields[], res)
        let output = trimFields(updatedUserDetails, Object.keys(updateSet))
        return output;

    }

    private async updateUserDetails(req: Request, res: Response) {
        let updatedFields = this.updateDetails(Number(req.params.id), req.body, res)
        res.json({ message: updatedFields })
    }

    async updateUserDetailsServer(id: number, fields) {
        const updateSet = patchProps(fields, patchFields)
        let updatedFields = this.updateDetails(id, fields)
        return updatedFields;
    }

    private async getUserDetails(id: number, fields?: userDetailsFields[], res?: Response) {
        try {
            const userDetails = await this.DI.userDetailsRepository.findOneOrFail(id, { fields: [...fields] })
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