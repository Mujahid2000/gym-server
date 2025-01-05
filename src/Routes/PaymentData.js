const express = require('express');
const Transaction = require('../models/payment');
const router = express.Router();

router.post('/', async (req, res) => {
    const data = req.body;
    if (data) {
        try {
            // Insert the payment data into the database
            const result = await Transaction.create(data);

            // Send success response with the inserted data
            res.status(201).json({
                success: true,
                message: 'Payment data successfully inserted',
                data: result
            });
        } catch (error) {
            // Handle error during database insertion
            console.error('Error inserting payment data:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to insert payment data',
                error: error.message
            });
        }
    } else {
        // Handle the case where no data was provided
        console.log('Error: No data received');
        res.status(400).json({
            success: false,
            message: 'No data provided in the request'
        });
    }
});

module.exports = router;
