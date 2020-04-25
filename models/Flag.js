const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const flagScema = new mongoose.Schema({
  userId: ObjectId,
  linkId: ObjectId,
  isSuspicious: Boolean,
  comment: String
}, { timestamps: true });

const Flag = mongoose.model('Link', flagScema);

module.exports = Flag;