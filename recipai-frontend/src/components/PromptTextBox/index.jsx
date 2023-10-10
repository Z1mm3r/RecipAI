import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import { useEffect, useRef, useState } from 'react'

const classes = {
    container: {
        width: "70%"
    },
    text: {
        width: "100%",
        whiteSpace: 'pre-wrap'
    }
}


const PromptTextBox = (props) => {

    const { text } = { ...props };
    const [outputText, setOutputText] = useState('')

    const [loadInterval, setLoadInterval] = useState(null)
    const [intervalDone, setIntervalDone] = useState(false);

    useEffect(() => {
        if (text.length > 0) {
            let incomingText = text;
            let counter = 0;
            setLoadInterval(setInterval(() => {
                if (incomingText.length === counter) {
                    setIntervalDone(true);
                }
                setOutputText(incomingText.substring(0, counter + 1));
                counter++;
            }, 20));

            return () => {
                if (loadInterval) {
                    clearInterval(loadInterval);
                    setLoadInterval(null);
                }
            }
        }
    }, [text])

    useEffect(() => {
        if (intervalDone) {
            clearInterval(loadInterval);
            setIntervalDone(false);
            setLoadInterval(null)
        }
    }, [intervalDone])



    return (
        <>
            <Card>
                <Grid2 container justifyContent="center" alignItems="flex-start">
                    <Grid2 style={classes.container}>
                        <Typography style={classes.text}>
                            {outputText}
                        </Typography>
                    </Grid2>
                </Grid2>

            </Card>
        </>
    )
}

export default PromptTextBox;