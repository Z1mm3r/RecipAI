import React, { useState, useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import PromptTextBox from '../../components/PromptTextBox'
import SendPromptButton from '../../components/SendPromptButton'

import InitialScreenSection from './InitialScreenSection'
import mockRequest from '../../mock/mockServer.js'
import { clamp, lerp, pct } from '../../util/utils'


const PromptTest = () => {


    const [responseText, setResponseText] = useState("");

    useEffect(() => {
        console.log(responseText);
    }, [responseText]);

    const handlePromptSend = useCallback((text) => {
        fetch("/api/recipe", {
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

    const handleMockPrompt = useCallback((text) => {
        mockRequest()
            .then(res => {
                console.log(res)
                setResponseText(res)
            });
    }, [text])

    const sendPromptCallback = useCallback((text) => {
        if (process.env.NODE_ENV == 'development') {
            console.log("Mock response for dev")
            //TODO only when testing api 
            //handlePromptSend();
            //All other times
            handleMockPrompt(text);

        }

        else if (process.env.NODE_ENV == 'test') {
            console.log("Test mock here?")
        }

        else if (process.env.NODE_ENV == 'production') {
            console.log("DO real API code here")
            handlePromptSend(text);
        }

        else {
            console.log("node env not found")
        }


    })

    return (
        <>
            <Grid2 alignItems="center" container direction="column" spacing={12}>
                <Grid2 xs={12}>
                </Grid2>
                <InitialScreenSection sendPromptCallback={sendPromptCallback} />
                <Grid2 xs={12}>
                    <PromptTextBox text={responseText} />
                </Grid2>
            </Grid2 >


            <div />

        </>
    )
}

export default PromptTest;