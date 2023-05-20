import type { Session, User } from "next-auth";
import type {JWT} from "next-auth/jwt";
type UserId = string;
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User & {
            id: UserId;
        };
    }
}

declare module "next-auth" {
    interface JWT {
        id: UserId;
    }
}