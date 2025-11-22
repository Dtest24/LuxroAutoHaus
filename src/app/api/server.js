import { createRequestHandler } from "@react-router/dev/standalone";
import path from "node:path";

// Path to your build folder
const BUILD_DIR = path.resolve("./build");

export default async function handler(req, res) {
  try {
    createRequestHandler({
      build: BUILD_DIR,
      mode: process.env.NODE_ENV || "production",
    })(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
