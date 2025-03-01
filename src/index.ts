import express from "express";
import dotenv from "dotenv";
import akunRoutes from "./routes/AkunRoutes";
import ticketRoutes from "./routes/TicketRoutes";
import matchRoutes from "./routes/MatchRoutes";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "API is working" });
});

app.use("/auth", akunRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/match", matchRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
