import { Entity, Property, Unique, OneToOne, OneToMany, Collection } from '@mikro-orm/core'
import { CustomBaseEntity } from './CustomBaseEntity';
import { UserDetails } from './UserDetails';
import { Recipe } from './Recipe';

@Entity()
export class User extends CustomBaseEntity {

    @Property()
    @Unique()
    userName: string;

    @Property()
    bio: string;

    @Property()
    profilePicture: string;

    @OneToOne()
    details: UserDetails;

    @OneToMany(() => Recipe, recipe => recipe.author)
    recipes = new Collection<Recipe>(this);

    constructor(userName: string, email: string) {
        super();
        this.userName = userName;
    }

}