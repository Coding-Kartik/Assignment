import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PipelineForm = ({ setShowForm, editingPipeline, setEditingPipeline }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  // Pre-fill the form fields if editing an existing pipeline
  useEffect(() => {
    if (editingPipeline) {
      setName(editingPipeline.name);
      setDescription(editingPipeline.description);
      setSource(editingPipeline.source);
      setDestination(editingPipeline.destination);
    }
  }, [editingPipeline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pipelineData = { name, description, source, destination };

    try {
      if (editingPipeline) {
        // Update existing pipeline
        await axios.put(`http://localhost:5000/api/pipelines/${editingPipeline._id}`, pipelineData);
        setEditingPipeline(null); // Reset editing state
      } else {
        // Create a new pipeline
        await axios.post('http://localhost:5000/api/pipelines', pipelineData);
      }

      setShowForm(false); // Hide the form on success
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error('Error submitting pipeline:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Close the form without saving
    setEditingPipeline(null); // Reset editing state
  };

  return (
    <div className="mt-4 p-4 border">
      <h2 className="text-xl font-bold mb-4">{editingPipeline ? 'Edit Pipeline' : 'Create New Pipeline'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Pipeline Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingPipeline ? 'Update Pipeline' : 'Save Pipeline'}
        </button>
        <button
          onClick={handleCancel}
          className="ml-4 bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PipelineForm;
