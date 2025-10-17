// const express = require('express');
// const router = express.Router();

// // Import the Resume model
// const Resume = require('../models/Resume');

// /**
//  * @route   GET /api/resumes/user/:userId
//  * @desc    Get resume by user ID
//  * @access  Public (for now, will be protected on Day 3)
//  */
// router.get('/user/:userId', async (req, res) => {
//     try {
//         // Find the resume document where the 'user' field matches the provided userId
//         const resume = await Resume.findOne({ user: req.params.userId });

//         if (!resume) {
//             return res.status(404).json({ message: 'Resume not found' });
//         }

//         res.json(resume);
//     } catch (err) {
//         console.error(err.message);
//         // If the provided ID is not a valid MongoDB ObjectId, it will throw an error
//         if (err.kind === 'ObjectId') {
//              return res.status(404).json({ message: 'Resume not found' });
//         }
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();

// Import our new authentication middleware
const auth = require('../middleware/auth');

// Import the Resume model
const Resume = require('../models/Resume');

/**
 * @route   GET /api/resumes/me
 * @desc    Get the logged-in user's resume
 * @access  Private
 */
router.get('/me', auth, async (req, res) => {
    try {
        // The 'auth' middleware decodes the token and adds the user's ID to req.user.id
        const resume = await Resume.findOne({ user: req.user.id });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found for this user' });
        }

        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


/**
 * @route   POST /api/resumes/project
 * @desc    Add a new project to the resume (e.g., from Hackathon platform)
 * @access  Private
 */
router.post('/project', auth, async (req, res) => {
    // Destructure the project details from the request body
    const { name, date, description, skills } = req.body;

    const newProject = { name, date, description, skills };

    try {
        // Find the resume belonging to the logged-in user
        const resume = await Resume.findOne({ user: req.user.id });

        // Add the new project to the beginning of the projects array
        resume.projects.unshift(newProject);
        
        // If new skills are provided, add them to the main skills list
        if (skills && skills.length > 0) {
            skills.forEach(skill => {
                if (!resume.skills.includes(skill)) {
                    resume.skills.push(skill);
                }
            });
        }

        await resume.save();

        res.json(resume); // Return the updated resume
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


/**
 * @route   POST /api/resumes/experience
 * @desc    Add new work experience (e.g., from Internship platform)
 * @access  Private
 */
router.post('/experience', auth, async (req, res) => {
    const { title, company, date, description } = req.body;
    const newExperience = { title, company, date, description };

    try {
        const resume = await Resume.findOne({ user: req.user.id });
        resume.experience.unshift(newExperience);
        await resume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// We are keeping this public endpoint for now for potential public profile links.
// In a full production app, you might want to secure this as well.
/**
 * @route   GET /api/resumes/user/:userId
 * @desc    Get resume by user ID
 * @access  Public
 */
router.get('/user/:userId', async (req, res) => {
    try {
        // Find the resume document where the 'user' field matches the provided userId
        const resume = await Resume.findOne({ user: req.params.userId }).populate('user', ['name']);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (err) {
        console.error(err.message);
        // If the provided ID is not a valid MongoDB ObjectId, it will throw an error
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(500).send('Server Error');
    }
});


module.exports = router;

