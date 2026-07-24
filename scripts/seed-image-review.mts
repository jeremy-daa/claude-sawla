import { promises as fs } from "node:fs";
import path from "node:path";
import dns from "node:dns";
import { MongoClient } from "mongodb";
import { seedInitialImageReview } from "../lib/image-review-seed";

async function loadDotEnv() {
  const file = path.join(process.cwd(), ".env");
  const raw = await fs.readFile(file, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1].trim();
    const value = match[2].trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  await loadDotEnv();
  // This DNS override is limited to the local seed command. The deployed app
  // uses the platform resolver, which works on Vercel.
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
  const resolver = new dns.promises.Resolver();
  resolver.setServers(["1.1.1.1", "8.8.8.8"]);
  const rawUri = process.env.MONGODB_URI!;
  const parsedUri = new URL(rawUri.replace("mongodb+srv://", "http://"));
  const seedHosts = process.env.MONGODB_SEED_HOSTS ?? (await resolver.resolveSrv(`_mongodb._tcp.${parsedUri.hostname}`))
    .map((record) => `${record.name}:${record.port ?? 27017}`)
    .join(",");
  const query = new URLSearchParams(parsedUri.search);
  query.set("tls", "true");
  const standardUri = `mongodb://${parsedUri.username}:${parsedUri.password}@${seedHosts}${parsedUri.pathname || "/"}?${query.toString()}`;
  const client = new MongoClient(standardUri, {
    connectTimeoutMS: 8000,
    serverSelectionTimeoutMS: 12000,
  });

  await client.connect();
  try {
    const result = await seedInitialImageReview(client.db("sawla-tours"));
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
