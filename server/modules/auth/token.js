const mongoose = require('mongoose');

const config = require('../../config');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expireAfterSeconds: config.refreshToken.expiresIn },
  },
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema, 'tokens');

module.exports = Token;
