import { defineConfig } from "drizzle-kit";

// @ts-ignore
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./data.db",
  },
});
