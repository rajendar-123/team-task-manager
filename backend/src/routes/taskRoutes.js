const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const { createTask, getTasks, updateTaskStatus, deleteTask } = require('../controllers/taskController');

router.post('/', protect, adminOnly, createTask);
router.get('/', protect, getTasks);
router.patch('/:id/status', protect, updateTaskStatus);
router.delete('/:id', protect, adminOnly, deleteTask);

module.exports = router;
