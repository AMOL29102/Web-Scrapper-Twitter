const mongoose = require('mongoose');

const TrendsSchema = new mongoose.Schema({
    trends: [
        {
            topic: { type: String, required: true },
            trendName: { type: String, required: true },
            posts: { type: String }
        }
    ],
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trends', TrendsSchema);
