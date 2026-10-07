const express = require('express');
const products = require('../product-manager');
const Order = require('../models/order');

const router = express.Router();


// GET /products
router.get('/products', (req, res) => {
    res.status(200).json(products);
});


// POST /orders
router.post('/orders', async (req, res) => {
    try {
        const { productId, size, quantity, status } = req.body;

        const product = products.find((item) => item.id === productId);

        if (!product) {
            return res.status(400).json({
                error: 'Product not found.'
            });
        }

        const order = new Order({
            productId,
            size,
            quantity,
            status
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// GET /orders
// Example filter: /orders?status=pending
router.get('/orders', async (req, res) => {
    try {
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const orders = await Order.find(filter);

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// GET /orders/:id
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                error: 'Order not found.'
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// PUT /orders/:id
router.put('/orders/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                error: 'Order not found.'
            });
        }

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});


// DELETE /orders/:id
router.delete('/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({
                error: 'Order not found.'
            });
        }

        res.status(200).json({
            message: 'Order deleted.'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = router;