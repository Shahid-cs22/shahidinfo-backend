const { Profile, Skill, Experience, Education, Project } = require('../models/Portfolio');
const { getDBStatus } = require('../config/db');
const seedData = require('../seed/seedData');

// In-memory state store (used if MongoDB connection is offline)
let memoryData = JSON.parse(JSON.stringify(seedData));

memoryData.projects = memoryData.projects.map((p, idx) => ({ ...p, _id: p._id || `mem_proj_${idx + 1}` }));
memoryData.skills = memoryData.skills.map((s, idx) => ({ ...s, _id: s._id || `mem_skill_${idx + 1}` }));
memoryData.experiences = memoryData.experiences.map((e, idx) => ({ ...e, _id: e._id || `mem_exp_${idx + 1}` }));
memoryData.education = memoryData.education.map((ed, idx) => ({ ...ed, _id: ed._id || `mem_edu_${idx + 1}` }));

/**
 * @desc Get all aggregated portfolio data - 100% Dynamic from Database
 * @route GET /api/portfolio
 */
const getPortfolioData = async (req, res) => {
  try {
    if (getDBStatus()) {
      // Fetch exact records from MongoDB collections
      const profile = await Profile.findOne();
      const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
      const experiences = await Experience.find().sort({ order: 1 });
      const education = await Education.find().sort({ order: 1 });
      const projects = await Project.find().sort({ order: 1 });

      // Return exact database state - never re-inject deleted items!
      return res.status(200).json({
        success: true,
        source: 'mongodb',
        data: {
          profile: profile || null,
          skills: skills || [],
          experiences: experiences || [],
          education: education || [],
          projects: projects || []
        }
      });
    } else {
      // In-memory dynamic engine
      return res.status(200).json({
        success: true,
        source: 'memory-engine',
        data: {
          profile: memoryData.profile || null,
          skills: memoryData.skills || [],
          experiences: memoryData.experiences || [],
          education: memoryData.education || [],
          projects: memoryData.projects || []
        }
      });
    }
  } catch (error) {
    console.error('Error fetching dynamic portfolio data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio data from database',
      error: error.message,
      data: {
        profile: null,
        skills: [],
        experiences: [],
        education: [],
        projects: []
      }
    });
  }
};

/**
 * @desc Update main profile
 * @route PUT /api/portfolio/profile
 */
const updateProfile = async (req, res) => {
  try {
    const updateFields = req.body;

    if (getDBStatus()) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = await Profile.create(updateFields);
      } else {
        Object.assign(profile, updateFields);
        await profile.save();
      }
      return res.status(200).json({ success: true, message: 'Profile updated in MongoDB', data: profile });
    } else {
      memoryData.profile = { ...(memoryData.profile || {}), ...updateFields };
      return res.status(200).json({ success: true, message: 'Profile updated in memory engine', data: memoryData.profile });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get all projects
 * @route GET /api/portfolio/projects
 */
const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;

    if (getDBStatus()) {
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.featured = true;

      const projects = await Project.find(query).sort({ order: 1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    } else {
      let filtered = [...(memoryData.projects || [])];
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category?.toLowerCase() === category.toLowerCase());
      }
      if (featured === 'true') {
        filtered = filtered.filter(p => p.featured);
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create new project
 * @route POST /api/portfolio/projects
 */
const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    if (!projectData.title) {
      return res.status(400).json({ success: false, message: 'Project title is required' });
    }

    if (getDBStatus()) {
      const newProj = await Project.create(projectData);
      return res.status(201).json({ success: true, message: 'Project created in MongoDB', data: newProj });
    } else {
      const newProj = {
        ...projectData,
        _id: `mem_proj_${Date.now()}`,
        tech: projectData.tech || [],
        highlights: projectData.highlights || [],
        order: (memoryData.projects?.length || 0) + 1
      };
      if (!memoryData.projects) memoryData.projects = [];
      memoryData.projects.push(newProj);
      return res.status(201).json({ success: true, message: 'Project created in memory', data: newProj });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update existing project
 * @route PUT /api/portfolio/projects/:id
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (getDBStatus()) {
      const updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, message: 'Project updated in MongoDB', data: updated });
    } else {
      const index = memoryData.projects.findIndex(p => p._id.toString() === id.toString());
      if (index === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      memoryData.projects[index] = { ...memoryData.projects[index], ...updateData };
      return res.status(200).json({ success: true, message: 'Project updated in memory', data: memoryData.projects[index] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete project - permanently removes record
 * @route DELETE /api/portfolio/projects/:id
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Project not found in database' });
      return res.status(200).json({ success: true, message: 'Project deleted permanently from MongoDB' });
    } else {
      const beforeLen = memoryData.projects.length;
      memoryData.projects = memoryData.projects.filter(p => p._id.toString() !== id.toString());
      if (memoryData.projects.length === beforeLen) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({ success: true, message: 'Project deleted permanently from memory' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get all skills
 * @route GET /api/portfolio/skills
 */
const getSkills = async (req, res) => {
  try {
    if (getDBStatus()) {
      const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
      return res.status(200).json({ success: true, count: skills.length, data: skills });
    } else {
      return res.status(200).json({ success: true, count: memoryData.skills?.length || 0, data: memoryData.skills || [] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create new skill
 * @route POST /api/portfolio/skills
 */
const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency, popular } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Skill name and category are required' });
    }

    if (getDBStatus()) {
      const skill = await Skill.create({
        name,
        category,
        proficiency: proficiency || 80,
        popular: !!popular
      });
      return res.status(201).json({ success: true, message: 'Skill created in MongoDB', data: skill });
    } else {
      const skill = {
        _id: `mem_skill_${Date.now()}`,
        name,
        category,
        proficiency: Number(proficiency) || 80,
        popular: !!popular
      };
      if (!memoryData.skills) memoryData.skills = [];
      memoryData.skills.push(skill);
      return res.status(201).json({ success: true, message: 'Skill created in memory', data: skill });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update skill
 * @route PUT /api/portfolio/skills/:id
 */
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (getDBStatus()) {
      const skill = await Skill.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
      return res.status(200).json({ success: true, message: 'Skill updated in MongoDB', data: skill });
    } else {
      const idx = memoryData.skills.findIndex(s => s._id.toString() === id.toString());
      if (idx === -1) return res.status(404).json({ success: false, message: 'Skill not found' });
      memoryData.skills[idx] = { ...memoryData.skills[idx], ...updateData };
      return res.status(200).json({ success: true, message: 'Skill updated in memory', data: memoryData.skills[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete skill - permanently removes record
 * @route DELETE /api/portfolio/skills/:id
 */
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
      return res.status(200).json({ success: true, message: 'Skill deleted permanently from MongoDB' });
    } else {
      const beforeLen = memoryData.skills.length;
      memoryData.skills = memoryData.skills.filter(s => s._id.toString() !== id.toString());
      if (memoryData.skills.length === beforeLen) return res.status(404).json({ success: false, message: 'Skill not found' });
      return res.status(200).json({ success: true, message: 'Skill deleted permanently from memory' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get experiences and education
 * @route GET /api/portfolio/experience
 */
const getExperienceAndEducation = async (req, res) => {
  try {
    if (getDBStatus()) {
      const experiences = await Experience.find().sort({ order: 1 });
      const education = await Education.find().sort({ order: 1 });
      return res.status(200).json({ success: true, data: { experiences: experiences || [], education: education || [] } });
    } else {
      return res.status(200).json({
        success: true,
        data: {
          experiences: memoryData.experiences || [],
          education: memoryData.education || []
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create experience
 * @route POST /api/portfolio/experience
 */
const createExperience = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const exp = await Experience.create(data);
      return res.status(201).json({ success: true, message: 'Experience created in MongoDB', data: exp });
    } else {
      const exp = { ...data, _id: `mem_exp_${Date.now()}` };
      if (!memoryData.experiences) memoryData.experiences = [];
      memoryData.experiences.push(exp);
      return res.status(201).json({ success: true, message: 'Experience created in memory', data: exp });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update experience
 * @route PUT /api/portfolio/experience/:id
 */
const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (getDBStatus()) {
      const exp = await Experience.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
      return res.status(200).json({ success: true, message: 'Experience updated in MongoDB', data: exp });
    } else {
      const idx = memoryData.experiences.findIndex(e => e._id.toString() === id.toString());
      if (idx === -1) return res.status(404).json({ success: false, message: 'Experience not found' });
      memoryData.experiences[idx] = { ...memoryData.experiences[idx], ...updateData };
      return res.status(200).json({ success: true, message: 'Experience updated in memory', data: memoryData.experiences[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete experience - permanently removes record
 * @route DELETE /api/portfolio/experience/:id
 */
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const exp = await Experience.findByIdAndDelete(id);
      if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
      return res.status(200).json({ success: true, message: 'Experience deleted permanently from MongoDB' });
    } else {
      memoryData.experiences = memoryData.experiences.filter(e => e._id.toString() !== id.toString());
      return res.status(200).json({ success: true, message: 'Experience deleted permanently from memory' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create education
 * @route POST /api/portfolio/education
 */
const createEducation = async (req, res) => {
  try {
    const data = req.body;
    if (getDBStatus()) {
      const edu = await Education.create(data);
      return res.status(201).json({ success: true, message: 'Education milestone created in MongoDB', data: edu });
    } else {
      const edu = { ...data, _id: `mem_edu_${Date.now()}` };
      if (!memoryData.education) memoryData.education = [];
      memoryData.education.push(edu);
      return res.status(201).json({ success: true, message: 'Education created in memory', data: edu });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update education
 * @route PUT /api/portfolio/education/:id
 */
const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (getDBStatus()) {
      const edu = await Education.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      if (!edu) return res.status(404).json({ success: false, message: 'Education not found' });
      return res.status(200).json({ success: true, message: 'Education updated in MongoDB', data: edu });
    } else {
      const idx = memoryData.education.findIndex(e => e._id.toString() === id.toString());
      if (idx === -1) return res.status(404).json({ success: false, message: 'Education not found' });
      memoryData.education[idx] = { ...memoryData.education[idx], ...updateData };
      return res.status(200).json({ success: true, message: 'Education updated in memory', data: memoryData.education[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete education - permanently removes record
 * @route DELETE /api/portfolio/education/:id
 */
const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const edu = await Education.findByIdAndDelete(id);
      if (!edu) return res.status(404).json({ success: false, message: 'Education not found' });
      return res.status(200).json({ success: true, message: 'Education deleted permanently from MongoDB' });
    } else {
      memoryData.education = memoryData.education.filter(e => e._id.toString() !== id.toString());
      return res.status(200).json({ success: true, message: 'Education deleted permanently from memory' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};
