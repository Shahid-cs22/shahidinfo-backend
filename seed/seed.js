require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const { Profile, Skill, Experience, Education, Project } = require('../models/Portfolio');
const User = require('../models/User');
const seedData = require('./seedData');

const seedDB = async () => {
  console.log('[Seed] Connecting to MongoDB...');
  const connected = await connectDB();
  if (!connected) {
    console.error('[Seed Error] Could not connect to MongoDB. Please ensure MongoDB is running or check your MONGODB_URI.');
    process.exit(1);
  }

  try {
    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Project.deleteMany({}),
      User.deleteMany({})
    ]);

    console.log('[Seed] Inserting fresh portfolio data & Admin User...');
    await Profile.create(seedData.profile);
    await Skill.insertMany(seedData.skills);
    await Experience.insertMany(seedData.experiences);
    await Education.insertMany(seedData.education);
    await Project.insertMany(seedData.projects);

    // Create Admin User
    await User.create({
      name: 'Mohamed Shahid',
      email: 'moh.shahid2004@gmail.com',
      password: 'shahidety@2004',
      role: 'admin'
    });

    console.log('[Seed Success] Portfolio database & Admin User seeded successfully!');
    console.log('[Seed Info] Admin Email: moh.shahid2004@gmail.com | Password: shahidety@2004');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDB();
