const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = 3000;

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`server online at port${PORT}`);
})