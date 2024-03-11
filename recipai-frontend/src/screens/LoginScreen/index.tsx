import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const handleUsernameUpdate = (event) => {
        setUsername(event.target.value)
    }

    return (
        <Card>
            <Grid2>
                Login
            </Grid2>
        </Card>
    )

}

export default LoginScreen;