import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { TextField } from '@mui/material'
import { clamp, lerp, pct } from '../../../util/utils'
import { useCallback, useEffect, useState } from 'react'

import SendPromptButton from '../../../components/SendPromptButton'

const InitialScreenSection = (props) => {

    const { sendPromptCallback } = { ...props }

    const initialPadding = 25;

    const [classes, setClasses] = useState({
        container: {
            paddingTop: pct(initialPadding)
        }
    });

    const [text, setText] = useState("");

    const [initialPosition, setInitialPosition] = useState(true)
    const [padding, setPadding] = useState(pct(initialPadding))

    const [slideInterval, setSlideInterval] = useState(null)
    const [isIntervalDone, setIsIntervalDone] = useState(false)

    //TODO Check if we can swap this out for the new styles technique in MUI
    useEffect(() => {
        setClasses({
            ...classes,
            container: {
                ...classes.container,
                paddingTop: pct(padding)
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
            setSlideInterval(null);
            setIsIntervalDone(false);
        }
    }, [isIntervalDone])

    const handleButtonPress = useCallback(() => {

        sendPromptCallback(text);

        //Create the "slide" effect for our button & input.
        if (initialPosition) {
            setInitialPosition(false);
            let startTime = (new Date()).getTime();
            setSlideInterval(setInterval(() => {
                let currentTime = (new Date()).getTime();
                let lerpVal = lerp(initialPadding, 0, clamp(0, 1, 1 - (currentTime - startTime) / 1000))
                setPadding(lerpVal);
            }), 1000 / 10)
        }

        //Cleanup
        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
                setSlideInterval(null);
            }
        }
    },)

    const handleInputChange = (event) => {
        setText(event.target.value);
    }

    return (
        <>
            <Grid2 xs={12} style={classes.container}>
                <Grid2 alignItems="center" textAlign="center" container direction="column" spacing={1}>
                    <Grid2 xs={12}>
                        <TextField value={text} onChange={handleInputChange} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <SendPromptButton handleButtonPress={handleButtonPress} />
                    </Grid2>

                </Grid2>
            </Grid2>
        </>
    )
}

export default InitialScreenSection;