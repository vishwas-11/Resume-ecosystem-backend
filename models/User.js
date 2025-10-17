const mongoose = require('mongoose');

// This schema defines the structure for user documents in MongoDB.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no two users can register with the same email
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Creates a model from the schema, which is what we use to interact with the database.
module.exports = mongoose.model('user', UserSchema);
