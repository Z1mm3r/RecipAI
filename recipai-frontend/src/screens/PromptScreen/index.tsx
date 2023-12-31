import { useState, useCallback, useEffect } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import PromptTextBox from '../../components/PromptTextBox'

import InitialScreenSection from './InitialScreenSection'
import mockRequest from '../../mock/mockServer'

import { DEV_SERVER_ADDRESS, DEV_SERVER_PORT, PROD_SERVER_ADDRESS, PROD_SERVER_PORT } from '../../constants'
import { getURL } from '../../util/utils'
import { Divider } from '@mui/material'

const PromptScreen = () => {

    const [responseText, setResponseText] = useState("");
    const [text, setText] = useState("");

    const handlePromptSend = useCallback(() => {
        console.log("Sending message with: ", text);

        let url = getURL();
        console.log(url);
        fetch(`${url}/api/recipePrompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': text
            })

        })
            .then(res => res.text())
            .then((data) => {
                console.log(data)
                setResponseText(data)
            })
    }, [text])

    const handleMockPrompt = useCallback(() => {
        console.log("Sending mock message with: ", text);
        mockRequest()
            .then(res => {
                console.log(res)
                setResponseText(res)
            });
    }, [text])

    const sendPromptCallback = useCallback(() => {
        if (process.env.NODE_ENV == 'development') {
            console.log("Mock response for dev")
            //TODO only when testing api 
            //handlePromptSend();
            //All other times
            handleMockPrompt();

        }

        else if (process.env.NODE_ENV == 'test') {
            console.log("Test mock here?")
        }

        else if (process.env.NODE_ENV == 'production') {
            console.log("DO real API code here")
            handlePromptSend();
        }

        else {
            console.log("node env not found")
        }


    }, [text])

    const handleTextUpdate = (textIn) => {
        setText(textIn);
    }

    useEffect(() => {
        console.log(text);
    }, [text])

    return (
        <Grid2 container alignItems="center" justifyContent="center" direction="column">
            <Grid2 xs={8} display="flex" alignItems="center" justifyContent="center">
                <InitialScreenSection text={text} updateTextCallback={handleTextUpdate} sendPromptCallback={sendPromptCallback} />
            </Grid2>
            <Grid2 xs={8} padding={2}></Grid2>
            <Grid2 display="flex" alignItems={"center"} justifyContent={"center"} xs={8}>
                <PromptTextBox text={responseText} />
            </Grid2>
        </Grid2 >
    )
}

export default PromptScreen;