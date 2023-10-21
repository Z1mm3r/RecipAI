import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { TextField, Typography } from '@mui/material'
import { clamp, lerp, pct } from '../../../util/utils'
import { useCallback, useEffect, useState } from 'react'

import Card from '@mui/material/Card'

import SendPromptButton from '../../../components/SendPromptButton'

const InitialScreenSection = (props: { text: string, updateTextCallback: (string) => any, sendPromptCallback: () => any }) => {

    const { sendPromptCallback, updateTextCallback, text } = { ...props }

    const initialPadding = 12;

    const [classes, setClasses] = useState({
        container: {
            marginTop: pct(initialPadding)
        }
    });

    const [initialPosition, setInitialPosition] = useState(true)
    const [padding, setPadding] = useState(initialPadding)

    const [slideInterval, setSlideInterval] = useState(0)
    const [isIntervalDone, setIsIntervalDone] = useState(false)

    //TODO Check if we can swap this out for the new styles technique in MUI
    useEffect(() => {
        setClasses({
            ...classes,
            container: {
                ...classes.container,
                marginTop: pct(padding)
            }
        })

        //TODO if we change the styles technique this logic must go somewhere else.
        if (padding == 0 && !isIntervalDone) {
            setIsIntervalDone(true)
        }
    }, [padding])

    //Used to clean up intervals when finished.
    useEffect(() => {
        if (isIntervalDone) {
            clearInterval(slideInterval);
            setSlideInterval(0);
            setIsIntervalDone(false);
        }
    }, [isIntervalDone])

    const handleButtonPress = useCallback(() => {

        //TODO this comes from useCallback on parent component.
        //However due to closure if we are not checking for [text] on this level either, we will not be using the updated 'text' value upstream.
        //Think about this when not half
        sendPromptCallback();

        //Create the "slide" effect for our button & input.
        if (initialPosition) {
            setInitialPosition(false);
            let startTime = (new Date()).getTime();
            setSlideInterval(window.setInterval(() => {
                let currentTime = (new Date()).getTime();
                let lerpVal = lerp(initialPadding, 0, clamp(0, 1, 1 - (currentTime - startTime) / 1000))
                setPadding(lerpVal);
            }, 1000 / 60))
        }

        //Cleanup
        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                setSlideInterval(0);
            }
        }
    }, [sendPromptCallback])

    const handleInputChange = (event) => {
        updateTextCallback(event.target.value);
    }

    return (
        <Card style={classes.container}>
            <Grid2 xs={12} >
                <Grid2 alignItems="center" textAlign="center" container direction="column" spacing={1}>
                    <Grid2 xs={12}>
                        <Typography fontSize={24}>
                            What would you like to cook?
                        </Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField value={text} onChange={handleInputChange} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <SendPromptButton handleButtonPress={handleButtonPress} />
                    </Grid2>
                </Grid2>
            </Grid2>
        </Card>
    )
}

export default InitialScreenSection;