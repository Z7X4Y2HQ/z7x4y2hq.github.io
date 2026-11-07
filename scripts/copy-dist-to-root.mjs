import { copyFile, cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distPath = path.join(projectRoot, "dist");

await mkdir(projectRoot, { recursive: true });
await rm(path.join(projectRoot, "assets"), { recursive: true, force: true });
for (const entry of await readdir(distPath, { withFileTypes: true })) {
  const source = path.join(distPath, entry.name);
  const destination = path.join(projectRoot, entry.name);
  if (entry.isDirectory()) {
    await cp(source, destination, { recursive: true, force: true });
  } else {
    await copyFile(source, destination);
  }
}
