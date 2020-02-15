const mongoose = require('mongoose');

const config = require('../../config');

const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
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

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens');

module.exports = RefreshToken;
