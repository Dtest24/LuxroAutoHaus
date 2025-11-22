import { createRequestHandler } from "./server/index.js";

export default async function handler(req, res) {
  try {
    createRequestHandler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
