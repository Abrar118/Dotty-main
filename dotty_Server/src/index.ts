import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import fs from "node:fs";

const app = new Hono();
app.use("/api/*", cors());

app.get("/", (c) => {
  return c.json("Hello Hono!");
});

app.post("/current-match", async (c) => {
  const data = await c.req.json();
  console.log(data);
  return c.json(data);
});

app.get("/api/read-txt-and-update", (c) => {
  try {
    // const data = fs.readFileSync('D:/Arduino/Dotty-main/dotty_Server/src/data.txt', 'utf8');
    // console.log(data);
    const data = {
      player1Score: 2,
      player2Score: 3,
    };
    return c.json(data);
  } catch (err) {
    console.error(err);
    return c.json({ message: "Error reading file" });
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
