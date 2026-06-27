import { router } from "../../trpc";

export const testRouter = router({
  hello: router({}),
});
