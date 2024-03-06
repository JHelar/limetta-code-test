import { ZodTypeAny, z } from "zod";
import { RedditFullname, RedditKind } from "./types";

export function makeRedditListingOf<TData extends ZodTypeAny>(data: TData) {
  return z.object({
    kind: z.literal("Listing"),
    data: z.object({
      after: RedditFullname.nullable(),
      before: RedditFullname.nullable(),
      children: z.array(
        z.object({
          kind: RedditKind,
          data,
        })
      ),
    }),
  });
}
