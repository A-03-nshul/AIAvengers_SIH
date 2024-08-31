// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const trafficRoutes = require('./routes/traffic');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Use environment variable for MongoDB URI
const dbUrl =  process.env.ATLASDB_URL

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(dbUrl)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

app.use('/api/traffic', trafficRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
