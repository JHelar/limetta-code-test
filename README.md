# Limetta code test

A Reddit post list clone, for the Limetta code test

## Setup

### Node

The project uses node version `v18.19.1`

### Dependencies

Install dependencies with yarn version `4.1.0`

Install dependencies with command

```
yarn
```

## Run dev server

```
yarn dev
```

The dev server is hosted on http://localhost:3000

## Run test

Run the unit test with `vitest`

```
yarn test:unit
```

Run the e2e test with `playwright`

```
yarn test:e2e
```

Or all test at the same time

```
yarn test
```

## Page features

- Change the post limit by changing the value in the limit selector on the home page.
- Change the category (`subreddit`) by clicking the pen icon on the startpage, enter a new category value and click "Go".
- Navigate the the next or previous page by clicking the corresponding pagination buttons on the bottom of the home page.
- Click a post to view in its entirety and to view the comments.
