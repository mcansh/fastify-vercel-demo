import { NowApiHandler } from "@vercel/node";
import fastify from "fastify";

interface Query {
  name?: string;
}

const app = fastify({ logger: true });

app.get<{ Querystring: Query }>("/", async (req, res) => {
  const { name = "World" } = req.query;
  req.log.info({ name }, "hello world!");
  return `Hello ${name}!`;
});

const handler: NowApiHandler = async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};

export default handler;
