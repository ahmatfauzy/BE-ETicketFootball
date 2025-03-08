import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import akunRoutes from "./routes/AkunRoutes";
import ticketRoutes from "./routes/TicketRoutes";
import matchRoutes from "./routes/MatchRoutes";
const corsMiddleware = require('./corsConfig');


const app = express();


app.use(corsMiddleware);

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

// Jika menggunakan Express.js
// app.use(cors({
//   origin: 'http://localhost:5173', // atau '*' untuk pengujian
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(cors({ origin: 'http://localhost:5173' })); 
