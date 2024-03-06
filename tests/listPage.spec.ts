import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test("Render page title", async ({ page }) => {
  await expect(page).toHaveTitle(/Reddit - Limetta test/);
});

test("Renders subreddit posts", async ({ page }) => {
  await page.getByTestId("post-list").waitFor();

  const postListItems = await page.getByTestId("post-list-item").all();
  expect(postListItems.length).toBeGreaterThan(0);
});

test("Click on post item redirects to post page", async ({ page }) => {
  await page.getByTestId("post-list").waitFor();

  const firstPost = page.getByTestId("post-list-item").first();
  const firstPostTitle = await firstPost
    .getByTestId("post-list-item-title")
    .innerText();

  await firstPost.click();

  const postTitle = await page.getByTestId("page-heading").innerText();
  expect(firstPostTitle).toEqual(postTitle);
});
