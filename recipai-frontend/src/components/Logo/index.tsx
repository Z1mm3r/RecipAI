import Box from '@mui/material/Box'
import logo from '@assets/logo.png'
import { pct, px } from '@/util/utils'

const classes = {
    container: {
        width: px(128)
    },
}


//Figure out designs for header, should we have a profile badge, etc?
const Logo = () => {
    return (
        <Box sx={classes.container} component={"img"} src={logo} />
    )
}

export default Logo; 