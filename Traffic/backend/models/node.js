// models/node.js
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  name: String,
  nodeId: String,
  location: String,
  localityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Locality' },
  signals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Signal' }]
});

module.exports = mongoose.model('Node', nodeSchema);

