const express = require("express");
const app = express();

const cloudinary = require('cloudinary').v2
const { dbconnect } = require("./config/database");
const UserRoutes = require("./routes/UserRoutes");
const fileUpload = require('express-fileupload')
const dotenv = require("dotenv");

dotenv.config();
dbconnect();
const port = process.env.PORT;
app.use(express.json());

app.use(fileUpload({
  useTempFiles:true
}))

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

app.use("/api/v1", UserRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is running....",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port} port`);
});
