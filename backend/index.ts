import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
dotenv.config();
const app: Application = express();
app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "HireFlow Backend is Running",
  });
});
app.use("/api/auth", authRoutes);
 app.use("/api/candidates", candidateRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});