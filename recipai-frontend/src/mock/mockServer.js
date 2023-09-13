import response from './mockResponse.txt'

const stall = async (waitTime = 1000) => {
    await new Promise(resolve => setTimeout(resolve, waitTime));
}

const fakeApiCall = async () => {
    let output = fetch(response)
        .then(data => data.text())
    return output;
}

const mockApiRequest = async () => {
    await stall();
    const text = await fakeApiCall();
    return text;
}

export default mockApiRequest;