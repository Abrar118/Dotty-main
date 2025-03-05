import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";
import { type Db, MongoClient } from "mongodb";
import fs from "node:fs";

const app = new Hono();
app.use("/*", cors());

const ATLAS: string =
  "ATLAS URI";
const DATABASE: string = "DBNAME";
const db: Db = (await MongoClient.connect(ATLAS as string)).db(
  DATABASE as string
);

app.get("/", (c) => {
  return c.json("Hello Hono!");
});

app.get("/read-txt-and-update", async (c) => {
  try {
    const response = await db.collection("CurrentMatch").find().toArray();
    // console.log(response)

    if (response) {
      return c.json({
        player1: response[0].score,
        player2: response[1].score,
      });
    }
  } catch (err) {
    console.error(err);
    return c.json({ message: err });
  }
});

app.post("/update-history", async (c) => {
  try {
    const message = await c.req.json();
    const response = await db.collection("History").insertOne(message);

    return c.json({ message: "Score updated successfully" });
  } catch (err) {
    console.error(err);
    return c.json({ message: err });
  }
});

app.get("/read-history", async (c) => {
  try {
    const response = await db.collection("History").find().toArray();

    if (response) {
      return c.json(response);
    }
  } catch (err) {
    console.error(err);
    return c.json({ message: err });
  }
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
