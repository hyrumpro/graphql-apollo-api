const mongoose = require('mongoose');

require('dotenv').config();


const MONGODB_URI = process.env.MONGODB_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};


// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Task schema
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Create models
const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = {
    connectDB,
    User,
    Task,
};
