const allEntities = require("./src/entities");

import { Options } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const options: Options = {
    type: "postgresql",
    entities: allEntities,
    dbName: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    metadataProvider: TsMorphMetadataProvider,
    entitiesTs: ['./src/entities/*.ts']
}


export default options
