
import { DEV_SERVER_ADDRESS, DEV_SERVER_PORT, PROD_SERVER_ADDRESS, PROD_SERVER_PORT } from "../constants";
// Returns a value based on 
// Start => value at ratio value 0
// End => value at ratio value 1
// ratio -> value between [0 - 1]
export const lerp = (start, end, ratio) => {
    return start * ratio + end * (1 - ratio);
}

export const clamp = (min, max, value) => {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }

    return value;
}

//sets value to be a percent string.
export const pct = (value) => {
    return (`${value}%`);
}

export const getURL = () => {
    return process.env.NODE_ENV == 'development' ? `http://${DEV_SERVER_ADDRESS}:${DEV_SERVER_PORT}` : `${PROD_SERVER_ADDRESS}:${PROD_SERVER_PORT}`
}
