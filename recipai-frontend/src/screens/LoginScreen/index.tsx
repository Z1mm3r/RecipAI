import { useCallback, useState, useContext, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { pct } from "@/util/utils";
import { Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import { useNavigate } from "react-router-dom";

import { AccountContext } from "@/App";
import ErrorCard from "@/components/ErrorCard";

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
    const [account, setAccount] = useContext(AccountContext)
    const [error, setError] = useState("")
    const [loginFailed, setLoginFailed] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    //const account = useContext(AccountContext)

    const navigate = useNavigate();

    const handleLoginResponse = async (response: Response) => {
        const data = await response.json()
        console.log(data)
        if (data.code == "L0" || data.code == "L1") {
            setAccount({ ...account, loggedIn: data.loggedIn, username: data.username, userId: data.id })
        }
        console.log("redirect to prompt")
        navigate('/prompt')
    }

    const requestLogin = useCallback(async () => {
        console.log("logging into: ", process.env.API_ENDPOINT)
        const options: RequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                password: password
            }),
            credentials: 'include',
            mode: 'cors',
        }

        try {
            const response = await fetch(`${process.env.API_ENDPOINT}/login`, options)
            console.log(response)
            if (response.ok) {
                handleLoginResponse(response)
            }
            else {
                if (response.status == 401) {
                    setError("Invalid username / password")
                }
                setLoginFailed(true)
                setShowErrorMessage(true)
            }
        } catch (error) {
            console.log("Error attempting to log in", error)
        }

    }, [username, password])


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
        if (username && password) {
            requestLogin()
        }
        else {
            console.log("Missing username or password")
        }

    }

    const renderErrorCard = useMemo(() => {
        if (loginFailed && showErrorMessage) {
            return (
                <ErrorCard error={error} />
            )
        }
        else {
            return null
        }
    }, [loginFailed, showErrorMessage, error])

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
                            {
                                renderErrorCard
                            }
                        </Grid2>
                    </Grid2>
                </Card>
            </Grid2 >
        </Grid2 >

    )

}

export default LoginScreen;