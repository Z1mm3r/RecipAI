import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { css } from '@emotion/react'

import { useEffect, useRef, useState } from 'react'

const containerClass = css({
    width: "70%"
})

const textClass = css({
    width: "100%",
    whiteSpace: "pre-wrap"
})


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
            }, 10));

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
        <>
            <Card>
                <Grid2 container justifyContent="center" alignItems="flex-start">
                    <Grid2 css={containerClass}>
                        <Typography css={textClass}>
                            {outputText}
                        </Typography>
                    </Grid2>
                </Grid2>

            </Card>
        </>
    )
}

export default PromptTextBox;