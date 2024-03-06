import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { fetchPosts } from "@/api/reddit";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPosts } from "./useFetchPosts";

vi.mock("@/api/reddit", async () => {
  const actual = await vi.importActual("@/api/reddit");
  const mockFetchPosts = vi.fn<
    Parameters<typeof fetchPosts>,
    ReturnType<typeof fetchPosts>
  >(() =>
    Promise.resolve({
      posts: [
        {
          data: {
            author: "Test author",
            created: Date.now(),
            id: "TestId",
            name: "t3_test",
            num_comments: 3,
            score: 3,
            selftext: "Test",
            stickied: false,
            subreddit: "vitest",
            title: "Testing",
          },
          kind: "t3",
        },
      ],
      before: null,
      after: null,
    })
  );

  return {
    ...actual,
    fetchPosts: mockFetchPosts,
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

const setQueryDataSpy = vi.spyOn(queryClient, "setQueryData");

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useFetchPosts", () => {
  it("should fetch the posts at given arguments", async () => {
    const { result } = renderHook(
      () => useFetchPosts({ subreddit: "test", after: "t1_test", limit: 10 }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        subreddit: "test",
        after: "t1_test",
        limit: 10,
      }),
      expect.anything()
    );
  });

  it("should fetch the posts with an initial count of limit", async () => {
    const { result } = renderHook(
      () => useFetchPosts({ subreddit: "test", limit: 10, after: "t1_test" }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 10,
      }),
      expect.anything()
    );
  });

  it("should fetch the posts with an initial count of 0", async () => {
    const { result } = renderHook(
      () => useFetchPosts({ subreddit: "test", limit: 10 }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 0,
      }),
      expect.anything()
    );
  });

  it("should increment count for each fetch posts call", async () => {
    const { result, rerender } = renderHook(useFetchPosts, {
      wrapper,
      initialProps: { subreddit: "test", limit: 10 },
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    rerender({ subreddit: "test", limit: 10, after: "t1_test" });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchPosts).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 1,
      }),
      expect.anything()
    );
  });

  it("should cache each individual post", async () => {
    const { result } = renderHook(useFetchPosts, {
      wrapper,
      initialProps: { subreddit: "test", limit: 10 },
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(setQueryDataSpy).toHaveBeenNthCalledWith(
      1,
      ["post", "vitest", "TestId"],
      expect.objectContaining({
        id: "TestId",
      })
    );
  });
});
