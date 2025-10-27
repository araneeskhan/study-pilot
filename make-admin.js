const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string - update this if needed
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/study-pilot';

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  email_verified: { type: Boolean, default: false },
  avatar: String,
  phone: String,
  country: String,
  preferences: {
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function makeUserAdmin(email) {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`User with email ${email} not found`);
      return;
    }

    console.log(`Found user: ${user.name} (${user.email})`);
    console.log(`Current role: ${user.role}`);

    // Update the user's role to admin
    user.role = 'admin';
    user.updated_at = new Date();
    await user.save();

    console.log(`Successfully updated ${email} to admin role`);
    console.log(`New role: ${user.role}`);

  } catch (error) {
    console.error('Error making user admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node make-admin.js <email>');
  console.log('Example: node make-admin.js newuser@studypilot.com');
  process.exit(1);
}

makeUserAdmin(email);