import mongoose from 'mongoose';

const uri =
  'mongodb+srv://guntupalliavinash33:O7TfYuj3u7bTc2OM@cluster0.w7hkpoc.mongodb.net/';

async function run() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

run();
