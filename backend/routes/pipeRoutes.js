const express = require('express');
const { getPipelines, createPipeline, runPipeline, updatePipeline, deletePipeline } = require('../controller/pipelineController.js');
const router = express.Router();

router.get('/', getPipelines);
router.post('/', createPipeline);
router.post('/run/:id', runPipeline);
router.put('/:id', updatePipeline);
router.delete('/:id', deletePipeline);

module.exports = router;
