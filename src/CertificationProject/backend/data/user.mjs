import bycryt from "bcryptjs";
import { v4 as generateId } from "uuid";

import { NotFoundError } from "../util/errors.mjs";
import { readData, writeData } from "./util.mjs";

export async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await bycryt.hash(data.password, 12);

  if (!storedData.users) {
    storedData.users = [];
  }

  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);

  return { id: userId, email: data.email };
}

export async function get(email) {
  const storedData = await readData();

  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Could not find any users.");
  }

  const user = storedData.users.find((ev) => ev.email === email);

  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
}
