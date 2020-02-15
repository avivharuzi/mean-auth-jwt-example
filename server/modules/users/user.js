const mongoose = require('mongoose');

const Password = require('./../../utils/password');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    lowercase: true,
    enum: [
      'user',
      'admin',
    ],
    default: 'user',
  },
}, { timestamps: true });

// eslint-disable-next-line
userSchema.pre('save', async function (next) {
  const user = this;

  try {
    user.password = await Password.generateHash(user.password);

    next();
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  return Password.compare(candidatePassword, user.password);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
