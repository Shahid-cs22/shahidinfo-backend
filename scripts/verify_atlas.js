const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');

async function checkConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not set in backend/.env');
    process.exit(1);
  }

  console.log(`[Diagnostic] Connecting to MongoDB Atlas URI:`);
  console.log(`> ${uri.replace(/:([^:@]+)@/, ':••••••••@')}`);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`\n======================================================`);
    console.log(`✅ SUCCESS: Connected to MongoDB Atlas!`);
    console.log(`• Cluster Host:     ${conn.connection.host}`);
    console.log(`• Database Name:    ${conn.connection.name}`);
    console.log(`• Connection State: ${conn.connection.readyState === 1 ? 'READY (1)' : conn.connection.readyState}`);
    console.log(`======================================================\n`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.log(`\n======================================================`);
    console.log(`❌ FAILED TO AUTHENTICATE WITH MONGODB ATLAS`);
    console.log(`• Error Message: ${err.message}`);
    console.log(`======================================================`);
    console.log(`\nHOW TO RESOLVE:`);
    console.log(`1. Go to https://cloud.mongodb.com -> Database Access`);
    console.log(`2. Verify that a Database User named 'mohshahid2004' exists.`);
    console.log(`3. If password was changed, update MONGODB_URI in backend/.env.`);
    console.log(`4. In Network Access, ensure 0.0.0.0/0 (anywhere) is allowed.\n`);
    process.exit(1);
  }
}

checkConnection();
