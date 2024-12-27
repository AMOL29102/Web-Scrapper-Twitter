const express = require('express');
const router = express.Router();
const Trends = require('../models/Trends');
const runPuppeteer = require('../utils/selenium');

router.get('/', async (req, res) => {
    
    res.render('index',{result:""});
});

router.post('/run-script', async (req, res) => {
    try {
        const result = await runPuppeteer(); // This should return the trends data
        
        // Log the result for debugging
        console.log('Puppeteer result:', result);

        if (!result) {
            // If no result is returned, send an error response
            res.status(500).send('Error running Puppeteer script or no result found.');
        } else {
            // If result is valid, render the page with result
            res.render('index', { result });
        }
    } catch (err) {
        console.error('Error in route:', err);
        res.status(500).send('Internal Server Error: ' + err.message);
    }
});

module.exports = router;
