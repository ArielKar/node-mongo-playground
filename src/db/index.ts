import mongoose from 'mongoose';
import { DB_CONN } from '../config';

function connectToDB() {
  const mongooseConnectionOps = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(DB_CONN!, mongooseConnectionOps, () => {
    console.log('MongoDB connected successfully');
  });
}

export default connectToDB;
