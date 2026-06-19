require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user.routes');

const app = express();

connectDB();

// global middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/users', userRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));