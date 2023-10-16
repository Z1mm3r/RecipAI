import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Typography from '@mui/material/Typography'


const classes = {
    container: {
        width: "100%"
    },
    element: {
        width: "100%",
    }
}


//Figure out designs for header, should we have a profile badge, etc?
const MainHeader = () => {
    return (
        <>
            <Grid2 container sx={classes.container}>
                <Grid2 display="flex" xs={3}>
                    <Grid2 container spacing={3} >
                        <Grid2 display="flex" textAlign={"center"} xs={6}>
                            Logo
                        </Grid2>
                        <Grid2 display="flex" textAlign={"center"} xs={6}>
                            <Typography>
                                RecipAI
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 xs={3} textAlign={"center"}>
                    Spacer
                </Grid2>
                <Grid2 xs={6} textAlign={"center"}>
                    Right Side Items
                </Grid2>

            </Grid2>
        </>
    )
}

export default MainHeader; 