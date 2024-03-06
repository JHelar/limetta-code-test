import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import PageLogo from "../../../logo.png";
import { DEFAULT_POST_LIMIT, DEFAULT_SUBREDDIT } from "@/api/reddit";

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="w-full flex justify-center py-4">
        <Link
          to="/"
          search={{ limit: DEFAULT_POST_LIMIT, subreddit: DEFAULT_SUBREDDIT }}
          className="flex flex-row flex-nowrap gap-x-2 items-center"
        >
          <img src={PageLogo} className="w-10 h-10" />
          <span className="font-semibold">Reddit limetta test</span>
        </Link>
      </header>
      {children}
    </>
  );
}
