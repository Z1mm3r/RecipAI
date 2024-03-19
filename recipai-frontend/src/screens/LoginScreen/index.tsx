import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { pct } from "@/util/utils";
import { Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const classes = {
    parentContainer: {
        marginTop: pct(5),
        minHeight: pct(60),
    },
    childGrid: {
        minHeight: pct(100)
    },
    loginCard: {
        minHeight: "30vh",
        width: pct(60)
    },
    cardElement: {
        width: pct(70)
    },
    cardInput: {
        width: pct(100),
        alignSelf: "center"
    }
}


const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const requestLogin = () => {
        console.log("logging into: ", import.meta.env.VITE_API_ENDPOINT)
    }


    const handleUsernameUpdate = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordUpdate = (event) => {
        setPassword(event.target.value)
    }

    const toggleShowPassword = (event) => {
        setShowPassword(!showPassword)
    }

    const handleLoginButtonPress = (event) => {
        console.log("Logging in with ", { username, password })
        requestLogin()

    }

    return (

        <Grid2 container alignItems="center" justifyContent="center" direction="column" sx={classes.parentContainer}>
            <Grid2 xs={8} justifyContent="center" alignItems="center" display={"flex"}>
                <Card sx={classes.loginCard}>
                    <Grid2 container alignItems="center" direction="column" justifyContent={"center"}>
                        <Grid2 xs={12} >
                            <Typography align="center">
                                Login
                            </Typography>
                        </Grid2>
                        <Grid2 sx={classes.cardElement}>
                            <Typography>
                                Username
                            </Typography>
                            <TextField
                                value={username}
                                sx={classes.cardInput}
                                onChange={handleUsernameUpdate}
                            />
                        </Grid2>
                        <Grid2 sx={classes.cardElement}>
                            <Grid2 container direction="column" alignItems={"center"}>
                                <Grid2 alignSelf={"start"}>
                                    <Typography>
                                        Password
                                    </Typography>
                                </Grid2>
                                <Grid2 sx={classes.cardInput}>
                                    <OutlinedInput
                                        sx={classes.cardInput}
                                        value={password}
                                        onChange={handlePasswordUpdate}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleShowPassword}>
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </Grid2>

                            </Grid2>
                        </Grid2>
                        <br />
                        <Grid2>
                            <Button onClick={handleLoginButtonPress}>
                                Login
                            </Button>
                        </Grid2>
                    </Grid2>
                </Card>
            </Grid2 >
        </Grid2 >

    )

}

export default LoginScreen;