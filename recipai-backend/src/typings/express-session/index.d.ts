import { Session, SessionData } from "express-session";

declare module "express-session" {
    interface SessionData {
        auth: string;
    }
}
