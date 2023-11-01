"use strict";
const { EntitySchema } = require("@mikro-orm/core");
const { BaseEntity } = require("./BaseEntity");
class Recipe extends BaseEntity {
    constructor(title, author, content) {
        super();
        this.title = title;
        this.author = author;
        this.content = content;
    }
}
const schema = new EntitySchema({
    class: Recipe,
    extends: "BaseEntity",
    properties: {
        title: { type: "string" },
        author: { type: "string" },
        content: { type: "string" },
    },
});
module.exports = {
    Recipe,
    entity: Recipe,
    schema,
    label: "recipeRepository",
};