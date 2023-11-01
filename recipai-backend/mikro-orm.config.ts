const allEntities = require("./server/entities");

import { Options } from "@mikro-orm/postgresql";

const config: Options = {
    type: "postgresql",
    entities: allEntities,
    dbName: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER


}

export default config

// module.exports = {
//     entities: allEntities,
//     type: "postgresql",

// };