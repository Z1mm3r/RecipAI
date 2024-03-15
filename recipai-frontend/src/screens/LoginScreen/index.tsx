import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { pct } from "@/util/utils";

const classes = {
    parentContainer: {
        marginTop: pct(5),
        minHeight: pct(60),
    },
    childGrid: {
        minHeight: pct(100)
    },
    loginCard: {
        minHeight: pct(100)
    }
}

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const handleUsernameUpdate = (event) => {
        setUsername(event.target.value)
    }

    return (

        <Grid2 container alignItems="center" justifyContent="center" direction="column" sx={classes.parentContainer}>
            <Grid2 xs={8} sx={classes.childGrid}>
                <Card sx={classes.loginCard}>
                    Login
                </Card>
            </Grid2>
        </Grid2>

    )

}

export default LoginScreen;