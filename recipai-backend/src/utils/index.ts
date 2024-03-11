export const patchProps = (props, keys): {} => {
    return Object.fromEntries(
        Object.entries(props).filter(([key, value]) => {
            return keys.includes(key) && value != null
        })
    )
}


export const trimFields = <Type>(object: Type, fields: string[]): {} => {
    const output = {}

    Object.keys(object).map(key => {
        if (fields.includes(key)) {
            output[key] = object[key];
        }
    });
    return output;
} 