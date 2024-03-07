import { Entity, Property, OneToOne } from '@mikro-orm/core'
import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';


import bcrypt from 'bcrypt'


@Entity()
export class UserDetails extends CustomBaseEntity {

    @Property()
    password: string;

    @Property()
    firstName?: string;

    @Property()
    lastName?: string;

    constructor(password: string, firstName?: string, lastName?: string) {
        super();

        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

}