---
title: Bruno API client
published: 2026-10-28
updated: 2026-10-28
tags: [bruno, api, reference]
---

## Links

- [Homepage](https://www.usebruno.com/)
- [Rolling roadmap](https://www.usebruno.com/roadmap?released=roadmap~0cb61f2d)
- [Git integration](https://docs.usebruno.com/git-integration/using-gui/intro)
- [Bruno CLI (npm lib)](https://www.npmjs.com/package/@usebruno/cli)
- [Bruno Github actions](https://docs.usebruno.com/bru-cli/github-actions/overview)
- [YouTube videos](https://www.youtube.com/@brunoapi/featured)
- [Why Bruno switched from bru to YAML](https://blog.usebruno.com/making-yaml-the-default-in-bruno-v3.1)
- [Bruno webinar sample repository](https://github.com/bruno-collections/bruno-automation-webinar)

## Scripting

- [Bruno JavaScript reference](https://docs.usebruno.com/testing/script/javascript-reference)

Prepare data before each request. Put this in the pre-request script of the collection or folder.

```js
// Prepare variables before each script
// Use dynamic variables instead of env variables, these are calculated automatically before running each request
var dateTimeNow = new Date();
bru.setVar("dateTime.now", dateTimeNow.toISOString());

var dateTimeTomorrow = new Date(dateTimeNow);
dateTimeTomorrow.setDate(dateTimeNow.getDate() + 1);
bru.setVar("dateTime.tomorrow", dateTimeTomorrow.toISOString());

var dateTimeYesterday = new Date(dateTimeNow);
dateTimeYesterday.setDate(dateTimeNow.getDate() - 1);
bru.setVar("dateTime.yesterday", dateTimeYesterday.toISOString());

var dateTimeOneWeekAgo = new Date(dateTimeNow);
dateTimeOneWeekAgo.setDate(dateTimeNow.getDate() - 7);
bru.setVar("dateTime.oneWeekAgo", dateTimeOneWeekAgo.toISOString());

```

Create a custom request that retrieves ALL articles via API, then set dynamic variables for each one of them, so that you can use the (random) IDs later on.

```js
// Prefix for the Bruno dynamic variables to create
const envVarName = "test.articleShortId."

// Parse the response, create variables for each article short ID
let articles = res.getBody();
articles.articles.forEach(article => {
  let completeEnvVar = envVarName + article.shortId
  console.log("Set " + completeEnvVar + " to " + article.fullId);
  bru.setVar(completeEnvVar, article.fullId);
});
```

Check the username and password, fail if these are not set. Set as pre-request.

```js
// PRE-REQUEST IS ABOUT INPUTS.
// Pull config from the right scope (environment) and fail loudly if it
// is missing, instead of sending a call that can only 400.
const username = bru.getEnvVar("username");
const password = bru.getEnvVar("password");

if (!username || !password) {
    throw new Error(
        "username/password not set. Pick an environment, or inject the secret: " +
        "bru run --env ci --env-var password=..."
    );
}

console.log(`Logging in as ${username}`);
```

After request, check the response and set some vars.

```js
// POST-RESPONSE: EXTRACT.
// bru.setVar is runtime only - it lives in memory for this run and
// never touches disk. That is exactly what you want for a token.
// (bru.setEnvVar would persist it into environments/staging.yml.)
const body = res.getBody();

bru.setVar("accessToken", body.accessToken);
bru.setVar("userId", body.id);

console.log(`Token captured for user ${body.id}: ...${String(body.accessToken).slice(-8)}`);
```

## Tests and asserts

Tests are scripts that run after the response, have a defined name for the test that they are running, and failing one of the tests will clearly show the failure in the UI.

Write a test script that checks the response.

```js
// POST-RESPONSE: ASSERT.
test("login returns 200", () => {
    expect(res.getStatus()).to.equal(200);
});

test("response carries an access token", () => {
    expect(res.getBody().accessToken).to.be.a("string").with.length.above(20);
});

test("response carries the user id we will chain on", () => {
    expect(res.getBody().id).to.be.a("number");
});
```

Another example:

```js
const sent = JSON.parse(res.getBody().body);

test("notification sent", () => {
    expect(res.getStatus()).to.equal(200);
    expect(sent.event).to.equal("out_of_stock");
});

test("notification carries the stock figure Check stock saw", () => {
    expect(sent.stock).to.equal(0);
});
```

## Controlling the flow

In the pre-request or post-request scripts, one can add commands that control the flow: which requests are executed next, should this request be skipped, etc.

```js {hl_lines=[9,12]}
const product = res.getBody();
bru.setVar("stock", product.stock);

// The response decides where the run goes next. Jumping forward skips
// everything in between; the request that is skipped over on the other
// path guards itself with skipRequest (see Notify out of stock).
if (product.stock > 0) {
    console.log(`"${product.title}" has ${product.stock} in stock -> Place order`);
    bru.runner.setNextRequest("Place order");
} else {
    console.log(`"${product.title}" is out of stock -> Notify out of stock`);
    bru.runner.setNextRequest("Notify out of stock");
}
```

Skip a request if some condition fails.

```js
// Branch B guard. If Check stock took branch A, Place order has just run
// and file order lands here next. Drop this request from the run - a
// skip, not a failure - so the two paths rejoin at Nightly report.
if (Number(bru.getVar("stock")) > 0) {
    console.log("Stock available - nothing to notify, skipping");
    bru.runner.skipRequest();
}
```

## Bruno CLI

- [Bruno CLI (npm lib)](https://www.npmjs.com/package/@usebruno/cli)
- [Bruno CLI overview](https://docs.usebruno.com/bru-cli/run/overview)
