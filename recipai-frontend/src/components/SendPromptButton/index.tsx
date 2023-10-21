import Button from '@mui/material/Button'


const SendPromptButton = (props: { handleButtonPress: () => void }) => {

    let { handleButtonPress } = { ...props }

    return (
        <>
            <Button onClick={handleButtonPress}>
                Create Recipe
            </Button>
        </>
    )
}

export default SendPromptButton;