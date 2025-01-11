const mongoose = require("mongoose");
const dbConnect = require("./connection");
const express = require("express");
const { register, login } = require("./auth/auth");
const cors = require('cors');
const path = require('path');
const allroutes = require("./routes/allroutes");

// Connect to the database
dbConnect();

const app = express();


app.use(cors());


app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/", allroutes);

// Authentication routes
app.post("/auth/register", register);
app.post("/auth/login", login);


app.get("/", (req, res) => {
    res.send("Hello world");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
