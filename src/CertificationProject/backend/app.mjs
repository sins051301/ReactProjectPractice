import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events.mjs";
import authRoutes from "./routes/auth.mjs";
const app = express();
app.use(express.json());
const port = 8080;
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);

app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
