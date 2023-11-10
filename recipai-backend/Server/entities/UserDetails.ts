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


    @OneToOne({ mappedBy: 'details' })
    user: User;

    constructor(password: string, firstName?: string, lastName?: string) {
        super();

        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

}

//To check password:
// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });