const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const path = require('path');
const itemsRouter = require('./routes/items');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(cors());
app.use(express.json());

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: '/var/logs/api.log',
      format: winston.format.printf(({ timestamp, level, message }) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        return `${formattedDate} - ${message}`;
      })
    })
  ]
});

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Items routes
app.use('/items', itemsRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://10.12.202:27017/restful-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 