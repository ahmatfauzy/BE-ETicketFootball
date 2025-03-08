require('dotenv').config(); // Import dotenv
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
};

module.exports = cors(corsOptions);
