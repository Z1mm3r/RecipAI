import React, { useState, useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import PromptTextBox from '../../components/PromptTextBox'

import mockRequest from '../../mock/mockServer.js'
import { clamp, lerp, pct } from '../../util/utils'


const PromptTest = () => {

    const initialPadding = 25;

    const [classes, setClasses] = useState({
        container: {
            paddingTop: pct(initialPadding)
        }
    });

    const [text, setText] = useState("");
    const [responseText, setResponseText] = useState("");

    const [initialPosition, setInitialPosition] = useState(true)
    const [padding, setPadding] = useState(pct(initialPadding));

    const [slideInterval, setSlideInterval] = useState(null)
    const [isIntervalDone, setIsIntervalDone] = useState(false)


    useEffect(() => {
        console.log(responseText);
    }, [responseText]);

    useEffect(() => {
        setClasses({
            ...classes,
            container: {
                ...classes.container,
                paddingTop: pct(padding)
            }
        })

        if (padding == 0 && !isIntervalDone) {
            setIsIntervalDone(true)
        }
        //console.log(padding)
    }, [padding])

    useEffect(() => {
        if (isIntervalDone) {
            clearInterval(slideInterval);
            setSlideInterval(null);
            setIsIntervalDone(false);
        }
    }, [isIntervalDone])

    const handleInputChange = (event) => {
        setText(event.target.value);
    }

    const handlePromptSend = useCallback(() => {
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

    const handleMockPrompt = useCallback(() => {
        mockRequest()
            .then(res => {
                console.log(res)
                setResponseText(res)
            });
    }, [text])

    const handleButtonPress = useCallback(() => {
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

        if (initialPosition) {
            setInitialPosition(false);
            let startTime = (new Date()).getTime();
            setSlideInterval(setInterval(() => {
                let currentTime = (new Date()).getTime();
                console.log("TIME VALUE", (currentTime - startTime) / 1000)
                if (((currentTime - startTime) / 1000) < 0) {
                    console.log("UH WHY IS THIS NEGATIVE", currentTime, startTime);
                }
                // console.log(clamp(0, 1, (currentTime - startTime) / 1000))
                // console.log("LERP", lerp(initialPadding, 0, clamp(0, 1, 1 - (currentTime - startTime) / 1000)))
                let lerpVal = lerp(initialPadding, 0, clamp(0, 1, 1 - (currentTime - startTime) / 1000))
                setPadding(lerpVal);
            }), 1000 / 10)
        }

        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                setSlideInterval(null);
            }
        }
    },)

    return (
        <>
            <Grid2 alignItems="center" container direction="column" spacing={12}>
                <Grid2 xs={12}>
                </Grid2>
                <Grid2 xs={12} style={classes.container}>
                    <Grid2 alignItems="center" container direction="column" spacing={1}>
                        <Grid2 xs={12}>
                            <TextField value={text} onChange={handleInputChange} />
                        </Grid2>
                        <Grid2 xs={12}>
                            <Button onClick={handleButtonPress}>
                                Click me bro
                            </Button>
                        </Grid2>

                    </Grid2>
                </Grid2>
                <Grid2 xs={12}>
                    <PromptTextBox text={responseText} />
                </Grid2>
            </Grid2 >


            <div />

        </>
    )
}

export default PromptTest;