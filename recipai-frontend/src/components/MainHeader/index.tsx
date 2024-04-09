import { useMemo } from 'react'

import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import Logo from '@components/Logo'
import { userLogin } from '@customTypes/userLogin'
import RightSideHeader from './rightSideHeader'


const classes = {
    container: {
        width: "100%",
        height: "100%"
    },
    element: {
        width: "100%",
    }
}

//Figure out designs for header, should we have a profile badge, etc?
const MainHeader = () => {
    return (
        <Card sx={classes.container}>
            <Grid2 container alignItems={"center"}>
                <Grid2 display="flex" xs={3} >
                    <Grid2 container spacing={3} alignItems={"center"} >
                        <Grid2 display="flex" textAlign={"center"} xs={6}>
                            <Logo />
                        </Grid2>
                        <Grid2 display="flex" textAlign={"center"} xs={6}>
                            <Typography fontSize={36}>
                                RecipAI
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 xs={3} textAlign={"center"}>
                    {/*Spacer*/}
                </Grid2>
                <Grid2 xs={6} textAlign={"center"}>
                    <RightSideHeader />
                </Grid2>
            </Grid2>
        </Card>
    )
}

export default MainHeader; 