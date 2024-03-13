const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")

const dotenv = require("dotenv")

dotenv.config()

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_HOST,
    optionsSuccessStatus: 200,
}

//Connect Database
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))
app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("API Running...")
})

//Define Routes
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/rooms", require("./routes/api/rooms"))
app.use("/api/furniture", require("./routes/api/furniture"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})
