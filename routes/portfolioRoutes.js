const express = require('express');
const router = express.Router();
const {
  getPortfolioData,
  updateProfile,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getExperienceAndEducation,
  createExperience,
  updateExperience,
  deleteExperience,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Public read routes
router.get('/', getPortfolioData);
router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/experience', getExperienceAndEducation);

// Protected Admin CRUD routes
router.put('/profile', protect, updateProfile);

router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

router.post('/experience', protect, createExperience);
router.put('/experience/:id', protect, updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

module.exports = router;
