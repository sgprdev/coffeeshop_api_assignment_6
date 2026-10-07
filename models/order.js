const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },

    size: {
        type: String,
        required: true,
        enum: ['small', 'medium', 'large']
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed', 'cancelled']
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;