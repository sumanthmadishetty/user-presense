import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../config';

import uniqueValidator from 'mongoose-unique-validator';
import VisitHistory from './visitHistory';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  visitHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VisitHistory',
  },
});

userSchema.plugin(uniqueValidator, {
  message: 'Username already taken!',
});

userSchema.pre('save', async function (next) {
  const user = this;
  // TODO: need to test
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

userSchema.methods.findOrCreateVisitHistory = async function () {
  // const user = this;
  return (
    this.visitHistory ||
    VisitHistory.create({ user: this, active: true })
  );
};

const User = mongoose.model('User', userSchema);

export default User;
