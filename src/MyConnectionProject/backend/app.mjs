import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 4000;
//절대 경로의 생성
const __dirname = path.resolve();
app.use(cors());
//express.static() 미들웨어는 Express 서버에서 정적 파일을 제공하는 역할을 합니다.
// 예를 들어, 이미지, CSS 파일, JavaScript 파일 등의 정적 리소스를 클라이언트가 직접 접근할 수 있도록 합니다.
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


//수신한 HTTP 요청의 본문(body)을 JSON 형식으로 파싱(parsing)하기 
//위해 사용되는 미들웨어 설정입니다. 
//이 코드를 사용하면 서버는 JSON 형식으로 전송된 요청 본문을 자동으로 읽고, 
//이를 JavaScript 객체로 변환하여 req.body에 저장합니다.
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
