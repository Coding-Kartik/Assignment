const mongoose = require('mongoose');

const pipelineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  source: String,
  destination: String,
  status: { type: String, default: 'idle' },
  lastRunTime: Date,
});

module.exports = mongoose.model('Pipeline', pipelineSchema);
