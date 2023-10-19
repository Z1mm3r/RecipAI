import { userLogin } from "@/types/userLogin"

import { useMemo } from "react"


const RightSideHeader = (props: { userInfo: userLogin }) => {

    const { userInfo } = { ...props }
    const { loggedIn } = { ...userInfo }

    const renderLoggedOutHeader = useMemo(() => {
        return (
            <>
                loggedOut
            </>
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