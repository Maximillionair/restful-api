const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');
const fs = require('fs');
const winston = require('winston');
const path = require('path');
require('dotenv').config();

const app = express();
const logDir = '/var/logs';

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  console.error(`Log directory ${logDir} does not exist. Please ensure NFS mount is properly configured.`);
  process.exit(1);
}

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'api.log'),
      format: winston.format.printf(({ timestamp, level, message }) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString('nb-NO')} - ${message}`;
      })
    })
  ]
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/status', (req, res) => res.json({ status: 'ok' }));
app.use('/items', itemsRouter);

module.exports = app;
