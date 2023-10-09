import React, { useState, useCallback, useEffect } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'


//Figure out designs for header, should we have a profile badge, etc?
const MainHeader = () => {
    return (
        <>
            <Grid2 container>
                <Grid2>
                    <Grid2 container>
                        <Grid2>
                            Logo
                        </Grid2>
                        <Grid2>
                            Are we using text or png Title?
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2>
                    Spacer
                </Grid2>
                <Grid2>
                    Right Side Items
                </Grid2>

            </Grid2>
        </>
    )
}

export default MainHeader; 