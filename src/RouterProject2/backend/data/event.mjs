import fs from "node:fs/promises";

import { v4 as uuidv4 } from "uuid";

import NotFoundError from "../util/errors.mjs";
import path from "path";

const __dirname = path.resolve();
const eventPath = path.join(
  __dirname,
  "src",
  "RouterProject2",
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

export async function getAll() {
  const storedData = await readData();
  if (!storedData.events) {
    throw new NotFoundError("Could not find any events.");
  }
  return storedData.events;
}

export async function get(id) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const event = storedData.events.find((ev) => ev.id === id);
  if (!event) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  return event;
}

export async function add(data) {
  const storedData = await readData();
  storedData.events.unshift({ ...data, id: uuidv4() });
  await writeData(storedData);
}

export async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.events || storedData.events.length === 0) {
    throw new NotFoundError("Could not find any events.");
  }

  const index = storedData.events.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError("Could not find event for id " + id);
  }

  storedData.events[index] = { ...data, id };

  await writeData(storedData);
}

export async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.events.filter((ev) => ev.id !== id);
  await writeData({ events: updatedData });
}
