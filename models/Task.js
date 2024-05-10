const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    complete: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Task', taskSchema);
