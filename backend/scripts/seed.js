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

    const departments = [
      { name: 'Super Admin', email: 'admin@vocalcampus.com', role: 'admin', dept: 'General Administration' },
      { name: 'Academic Manager', email: 'academics@vocalcampus.edu', role: 'department', dept: 'Academic Affairs' },
      { name: 'Facilities Manager', email: 'facilities@vocalcampus.edu', role: 'department', dept: 'Maintenance & Facilities' },
      { name: 'Hostel Manager', email: 'gowsikk8@gmail.com', role: 'department', dept: 'Hostel Administration' },
      { name: 'Disciplinary Head', email: 'disciplinary@vocalcampus.edu', role: 'department', dept: 'Disciplinary Committee' }
    ];

    for (const d of departments) {
      const exists = await User.findOne({ email: d.email });
      if (!exists) {
        await User.create({
          name: d.name,
          email: d.email,
          password: 'password123',
          role: d.role,
          department: d.dept
        });
        console.log(`✅ User created: ${d.name} (${d.dept})`);
      } else {
        console.log(`ℹ️  User already exists: ${d.name}`);
      }
    }


    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
