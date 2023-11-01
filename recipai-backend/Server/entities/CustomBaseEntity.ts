import { v4 } from 'uuid';

import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export abstract class CustomBaseEntity {
    @PrimaryKey()
    uuid: string = v4();

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date;

}