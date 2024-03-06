import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ListPage, ListPageSeachParams } from "./pages/list";
import { PostPage } from "./pages/post";
import { Layout } from "./components/Layout";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

export const listRoute = createRoute({
  validateSearch: ListPageSeachParams,
  getParentRoute: () => rootRoute,
  path: "/",
  component: ListPage,
});

export const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post/$subreddit/$postId",
  component: PostPage,
});

const routeTree = rootRoute.addChildren([listRoute, postRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
