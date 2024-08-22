import { promises as fs } from "node:fs";
import path from "path";

// __dirname을 ESM에서 사용하려면 다음과 같은 방법을 사용합니다.
const __dirname = path.resolve();
const eventPath = path.join(
  __dirname,
  "src",
  "CertificationProject",
  "backend",
  "events.json"
);

export async function readData() {
  const data = await fs.readFile(eventPath, "utf8");
  return JSON.parse(data);
}

export async function writeData(data) {
  await fs.writeFile(eventPath, JSON.stringify(data));
}
