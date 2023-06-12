import express from "express";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import tasksRoutes from "./routes/tasks.routes";
const { connectDB } = require("./database");

connectDB();

const app = express();

env.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', authRoutes);

app.use('/api', tasksRoutes);

//Conectar a la API de OPENAI
app.post("/chat", chatRoutes);

//Crear Rutas Usuarios:
app.get("/users", (req, res) => {
  res.send("Lista de usuarios:");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
