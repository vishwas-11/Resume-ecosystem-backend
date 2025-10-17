const mongoose = require('mongoose');

// This schema defines the structure for resume documents in MongoDB.
const ResumeSchema = new mongoose.Schema({
    // This creates a direct link between a resume and a user.
    // The `ref: 'user'` tells Mongoose that this ID corresponds to a document in the 'user' collection.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    contact: {
        email: String,
        phone: String,
        linkedin: String
    },
    summary: {
        type: String
    },
    experience: [{
        title: String,
        company: String,
        date: String,
        description: String
    }],
    education: [{
        institution: String,
        degree: String,
        date: String
    }],
    projects: [{
        name: String,
        date: String,
        description: String,
        skills: [String]
    }],
    skills: [String],
    certifications: [{
        name: String,
        issuer: String,
        date: String
    }]
});

module.exports = mongoose.model('resume', ResumeSchema);
