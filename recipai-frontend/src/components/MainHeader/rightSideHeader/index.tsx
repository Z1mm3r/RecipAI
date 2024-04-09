import { userLogin } from "@/types/userLogin"

import { useMemo, useContext } from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"

import { AccountContext } from "@/App";

const RightSideHeader = () => {

    const [account, setAccount] = useContext(AccountContext)

    const renderLoggedOutHeader = useMemo(() => {
        return (
            <Grid2 container justifyContent={"flex-end"}>
                <Grid2 xs={4}>
                    <Link to="/login">
                        <Button variant="contained">
                            Log In
                        </Button>
                    </Link>
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
        if (account.loggedIn) {
            return (renderLoggedInHeader);
        }
        else {
            return (renderLoggedOutHeader);
        }
    }, [account])

    return (
        <>
            {renderRightSide}
        </>
    )
}

export default RightSideHeader;