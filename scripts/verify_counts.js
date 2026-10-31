const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');

async function checkCounts() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const cols = await db.listCollections().toArray();
  console.log('\n=============================================');
  console.log('LIVE MONGODB ATLAS CLUSTER STATUS:');
  console.log(`Database: ${mongoose.connection.name}`);
  console.log(`Cluster Host: ${mongoose.connection.host}`);
  console.log('---------------------------------------------');
  for (const c of cols) {
    const count = await db.collection(c.name).countDocuments();
    console.log(`- Collection '${c.name}': ${count} records`);
  }
  console.log('=============================================\n');
  await mongoose.disconnect();
}

checkCounts();

