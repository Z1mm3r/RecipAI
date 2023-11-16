export const patchProps = (props, keys): {} => {
    return Object.fromEntries(
        Object.entries(props).filter(([key, value]) => {
            return keys.includes(key) && value != null
        })
    )
}


export const trimFields = <Type>(object: Type, fields: string[]): {} => {
    const output = {}
    console.log("fields")
    console.log(fields)
    console.log("object keys")
    console.log(Object.keys(object))

    Object.keys(object).map(key => {
        if (fields.includes(key)) {
            output[key] = object[key];
            console.log("found a match")
        }
    });
    return output;
} 