import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 4000;
const __dirname = path.resolve();
app.use(cors());
// Serve static files from the 'public' directory
app.use(
  express.static(
    path.join(
      __dirname,
      "src",
      "MyConnectionProject",
      "backend",
      "public",
      "images"
    )
  )
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  try {
    const mealsPath = path.join(
      __dirname,
      "src",
      "MyConnectionProject",
      "backend",
      "data",
      "available-meals.json"
    );
    const meals = await fs.readFile(mealsPath, "utf8");
    res.status(200).json(JSON.parse(meals));
  } catch (error) {
    console.error("Error reading user-places.json:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  const customer = orderData.customer;
  if (
    !customer.email ||
    !customer.email.includes("@") ||
    !customer.name ||
    customer.name.trim() === "" ||
    !customer.street ||
    customer.street.trim() === "" ||
    !customer["postal-code"] ||
    customer["postal-code"].trim() === "" ||
    !customer.city ||
    customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  const ordersPath = path.join(
    __dirname,
    "src",
    "MyConnectionProject",
    "backend",
    "data",
    "orders.json"
  );
  const orders = await fs.readFile(ordersPath, "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile(ordersPath, JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
