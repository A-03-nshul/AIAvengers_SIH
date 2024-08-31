//models/signal.js
const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema({
  direction: String,
  status: String,
  nodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Signal', signalSchema);
