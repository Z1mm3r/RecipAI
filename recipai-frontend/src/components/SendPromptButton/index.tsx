import Button from '@mui/material/Button'


const SendPromptButton = (props: { handleButtonPress: () => void }) => {

    let { handleButtonPress } = { ...props }

    return (
        <>
            <Button onClick={handleButtonPress}>
                Click me bro
            </Button>
        </>
    )
}

export default SendPromptButton;