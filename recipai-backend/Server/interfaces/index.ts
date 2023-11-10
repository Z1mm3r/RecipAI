import { MikroORM, EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { User, Recipe, UserDetails } from "../entities";
import http from 'http'

export interface DI {
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>,
    userDetailsRepository: EntityRepository<UserDetails>,
    recipeRepository: EntityRepository<Recipe>,
    server: http.Server;
}