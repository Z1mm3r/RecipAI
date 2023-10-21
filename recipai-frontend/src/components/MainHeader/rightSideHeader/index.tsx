import { userLogin } from "@/types/userLogin"

import { useMemo } from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Button from "@mui/material/Button"


const RightSideHeader = (props: { userInfo: userLogin }) => {

    const { userInfo } = { ...props }
    const { loggedIn } = { ...userInfo }

    const renderLoggedOutHeader = useMemo(() => {
        return (
            <Grid2 container justifyContent={"flex-end"}>
                <Grid2 xs={4}>
                    <Button variant="contained">
                        Log In
                    </Button>
                </Grid2>
                <Grid2 xs={4}>
                    <Button variant="outlined">
                        Sign Up
                    </Button>
                </Grid2>
            </Grid2>
        )
    }, [])

    const renderLoggedInHeader = useMemo(() => {
        //TODO render avatar, username maybe, etc here.
        return (<>
            loggedIn
        </>
        )
    }, [])

    const renderRightSide = useMemo(() => {
        if (loggedIn) {
            return (renderLoggedInHeader);
        }
        else {
            return (renderLoggedOutHeader);
        }
    }, [loggedIn])

    return (
        <>
            {renderRightSide}
        </>
    )
}

export default RightSideHeader;