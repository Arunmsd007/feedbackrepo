const mongoose = require('mongoose');
const port = process.env.PORT || 10000;

const  feedbackSchema = new mongoose.Schema({
    name: String,
    contactNumber: String,
    email : String,
    feedback: String
});

module.exports = mongoose.model('Feedback',feedbackSchema); 
