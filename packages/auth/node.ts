import { auth } from "./index";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

export { fromNodeHeaders };

export const authHandler = toNodeHandler(auth);
