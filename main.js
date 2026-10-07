require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const ordersRoute = require('./routes/orders');

app.use(express.json());
app.use(cors());
app.use('/', ordersRoute);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    });
});

// 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found.'
    });
});

// AI-ASSISTED
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal server error'
        }
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error.message);
    });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});