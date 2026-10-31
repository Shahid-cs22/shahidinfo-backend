const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  roles: [{ type: String }],
  bioShort: { type: String, required: true },
  bioFull: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  resumeUrl: { type: String, default: '/ShahidResume.pdf' },
  avatarUrl: { type: String, default: '/avatar.png' },
  socials: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String }
  },
  stats: {
    projectsCount: { type: Number, default: 12 },
    experienceYears: { type: String, default: '2+' },
    commitsCount: { type: String, default: '450+' },
    satisfactionRate: { type: String, default: '100%' }
  }
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Languages'],
    required: true 
  },
  proficiency: { type: Number, min: 1, max: 100, default: 85 },
  icon: { type: String },
  popular: { type: Boolean, default: false }
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  type: { type: String, enum: ['Work Experience', 'Capstone / Research', 'Internship'], default: 'Work Experience' },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  skillsUsed: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  period: { type: String, required: true },
  details: { type: String, required: true },
  score: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: { type: String },
  description: { type: String, required: true },
  tech: [{ type: String }],
  category: { 
    type: String, 
    enum: ['All', 'Full Stack', 'Frontend', 'AI & Python', 'Mobile / Responsive'],
    default: 'Full Stack' 
  },
  github: { type: String },
  live: { type: String },
  featured: { type: Boolean, default: false },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);
const Education = mongoose.model('Education', EducationSchema);
const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
  Profile,
  Skill,
  Experience,
  Education,
  Project
};

