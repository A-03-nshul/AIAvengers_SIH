//models/locality.js
const mongoose = require('mongoose');

const localitySchema = new mongoose.Schema({
  name: String,
  location: String,
  nodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Node' }]
});

module.exports = mongoose.model('Locality', localitySchema);
