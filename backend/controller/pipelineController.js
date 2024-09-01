const Pipeline = require('../models/pipeline.js');

// Fetch all pipelines
const getPipelines = async (req, res) => {
  try {
    const pipelines = await Pipeline.find();
    res.json(pipelines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new pipeline
const createPipeline = async (req, res) => {
  const { name, description, source, destination } = req.body;
  try {
    const newPipeline = new Pipeline({ name, description, source, destination });
    await newPipeline.save();
    res.status(201).json(newPipeline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Run a pipeline (simplified)
const runPipeline = async (req, res) => {
  try {
    const pipeline = await Pipeline.findById(req.params.id);
    if (!pipeline) return res.status(404).json({ message: 'Pipeline not found' });

    // Simulate running the pipeline
    pipeline.status = 'running';
    pipeline.lastRunTime = new Date();
    await pipeline.save();

    res.json({ message: 'Pipeline running', pipeline });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pipeline
const updatePipeline = async (req, res) => {
  try {
    const updatedPipeline = await Pipeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPipeline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a pipeline
const deletePipeline = async (req, res) => {
  try {
    await Pipeline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pipeline deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPipelines, createPipeline, runPipeline, updatePipeline, deletePipeline };
