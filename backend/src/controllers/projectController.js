const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { title, description, teamMembers = [] } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Project title is required.' });
    }

    const project = await Project.create({
      title,
      description,
      teamMembers,
      createdBy: req.user._id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? {}
      : { teamMembers: req.user._id };

    const projects = await Project.find(query)
      .populate('createdBy', 'name email')
      .populate('teamMembers', 'name email role')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('teamMembers', 'name email role');

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
