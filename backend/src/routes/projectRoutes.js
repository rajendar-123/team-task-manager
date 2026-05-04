const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const { createProject, getProjects, getProjectById } = require('../controllers/projectController');

router.post('/', protect, adminOnly, createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectById);

module.exports = router;
