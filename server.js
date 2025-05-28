const express = require("express");
const mongooseConnect = require("./utils/databaseUtils");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandle/errorHandler");
const authRoutes = require("./routes/auth/auth");
const protectedRoutes = require("./routes/protected/protected");
const profileRouter = require("./routes/profile/profile");
const postRoutes = require("./routes/post/post");
const cookieParser = require("cookie-parser");

dotenv.config();

console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/user", profileRouter);
app.use("/api/post", postRoutes);

mongooseConnect(() => {
  app.listen(PORT, () => {
    console.log(
      `airbnb Server running successfully on http://localhost:${PORT}`
    );
  });
});
