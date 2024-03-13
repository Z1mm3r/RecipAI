import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Card from "@mui/material/Card"
import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return (
        <Grid2 container>
            <Card>
                Could not find page! Please check the url.
            </Card>
        </Grid2>
    )
}