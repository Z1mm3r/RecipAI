import { CardContent } from '@mui/material'
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
        whiteSpace: "pre-wrap"
    }
}


const PromptTextBox = (props: { text: string }) => {

    const { text } = { ...props };
    const [outputText, setOutputText] = useState('')

    const [loadInterval, setLoadInterval] = useState(0)
    const [intervalDone, setIntervalDone] = useState(false);

    useEffect(() => {
        if (text.length > 0) {
            let incomingText = text;
            let counter = 0;
            setLoadInterval(window.setInterval(() => {
                if (incomingText.length === counter) {
                    setIntervalDone(true);
                }
                setOutputText(incomingText.substring(0, counter + 1));
                counter++;
            }, 15));

            return () => {
                if (loadInterval) {
                    clearInterval(loadInterval);
                    setLoadInterval(0);
                }
            }
        }
    }, [text])

    useEffect(() => {
        if (intervalDone) {
            clearInterval(loadInterval);
            setIntervalDone(false);
            setLoadInterval(0)
        }
    }, [intervalDone])



    return (
        <Card variant="outlined" sx={classes.container}>
            <CardContent>
                <Typography textAlign={"center"}> Food Title </Typography>
                <Grid2 container justifyContent="center" alignItems="flex-start">
                    <Grid2 sx={classes.container}>
                        <Typography sx={classes.text}>
                            {outputText}
                        </Typography>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>)
}

export default PromptTextBox;