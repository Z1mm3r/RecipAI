
export interface userLogin {
    loggedIn: boolean;
    userInfo: {
        userName: string;
        userID: number;
    } | null
} 