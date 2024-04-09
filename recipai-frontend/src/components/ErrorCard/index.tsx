import { Typography } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { red } from "@mui/material/colors"

const classes = {
    card: {
        border: "1px solid red",
        backgroundColor: "#f3dbdb"
    }

}

const ErrorCard = (props: { error: string }) => {
    const { error } = { ...props }
    return (
        <Card variant="outlined" sx={classes.card}>
            <CardContent>
                <Typography>
                    {error}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ErrorCard