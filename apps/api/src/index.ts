// file: apps/api/src/index.ts
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { app } from "./app";
import { validateEnv } from "./utils/env";

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "apps", "api", ".env"),
  path.resolve(__dirname, "..", ".env"),
];

let loaded = false;
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    loaded = true;
    break;
  }
}

if (!loaded) {
  dotenv.config();
}

validateEnv();

const port = Number(process.env.API_PORT || 4000);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
