import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import alertRoutes from "./routes/alerts.js"
import eventRoutes from "./routes/events.js"
import logRoutes from "./routes/logs.js"
import { initializeDatabase } from "./db/db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, ".")))

// Initialize database
await initializeDatabase()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/alerts", alertRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/logs", logRoutes)

// Serve frontend files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login/login.html"))
})

app.listen(PORT, () => {
  console.log(`🚀 Student Alert System running on http://localhost:${PORT}`)
  console.log("📧 Make sure to configure your Gmail SMTP credentials")
})
