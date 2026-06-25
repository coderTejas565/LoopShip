import { router } from "./trpc";

// import { healthRouter } from "./routes/health/route";
// import { authRouter } from "./routes/auth/route";
import { organizationRouter } from "./routes/organization/route";
import { projectRouter } from "./routes/projects/route";

export const serverRouter = router({
  // health: healthRouter,
  // auth: authRouter,
  organization: organizationRouter,
  project: projectRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
