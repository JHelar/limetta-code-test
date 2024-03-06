import { z } from "zod";
import { TypePrefixes } from "./constants";

export const RedditKind = z.union([
  z.literal(TypePrefixes.Comment),
  z.literal(TypePrefixes.Account),
  z.literal(TypePrefixes.Link),
  z.literal(TypePrefixes.Message),
  z.literal(TypePrefixes.Subreddit),
  z.literal(TypePrefixes.Award),
]);
export type RedditKind = z.infer<typeof RedditKind>;

export type RedditFullname = `${RedditKind}_${string}`;
export const RedditFullname = z.custom<RedditFullname>((data) => {
  if (typeof data !== "string") return false;
  const [prefix, ...id] = data.split("_");
  return RedditKind.safeParse(prefix).success && id.length === 1;
});

export const Post = z.object({
  id: z.string(),
  author: z.string(),
  title: z.string(),
  subreddit: z.string(),
  selftext: z.string(),
  name: RedditFullname,
  stickied: z.boolean(),
  created: z.number(),
  num_comments: z.number(),
  score: z.number(),
  preview: z
    .object({
      images: z.array(
        z.object({
          source: z.object({
            url: z.string(),
          }),
        })
      ),
    })
    .nullish(),
});
export type Post = z.infer<typeof Post>;

export const Comment = z.object({
  id: z.string(),
  body: z.string(),
  author: z.string(),
  score: z.number(),
  created: z.number(),
});
export type Comment = z.infer<typeof Comment>;
