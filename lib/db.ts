import type { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export function getDb(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!global.prisma) {
    // Lazy-load to keep Cloudflare builds working without a database.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient: Client } = require("@prisma/client") as typeof import("@prisma/client");
    global.prisma = new Client({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return global.prisma;
}

/** @deprecated Prefer getDb() for optional database access */
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getDb();
    if (!client) {
      throw new Error("DATABASE_URL is not configured");
    }
    return Reflect.get(client, prop, receiver);
  },
});
