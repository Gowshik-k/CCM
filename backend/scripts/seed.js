const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing users? Maybe better not if it's a real db, but for seed usually yes.
    // await User.deleteMany(); 

    const adminExists = await User.findOne({ email: 'admin@vocalcampus.com' });

    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@vocalcampus.com',
        password: 'adminpassword123',
        role: 'admin',
        department: 'General Administration'
      });
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists.');
    }

    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
