import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import investmentRoutes from "./routes/investmentRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Normal middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", investmentRoutes);

app.get("/", (req, res) => {
    res.send("AI Investment Research Agent API is Running 🚀");
});

// Error middleware should be LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});