import { Entity, Property, Unique, OneToOne, ManyToOne } from '@mikro-orm/core'
import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';

@Entity()
export class Recipe extends CustomBaseEntity {

    @ManyToOne()
    author: User;

    @Property()
    name: string;

    @Property()
    text: string;

    constructor(name: string, text: string, author: User) {
        super();
        this.name = name;
        this.text = text;
        this.author = author;
    }

}