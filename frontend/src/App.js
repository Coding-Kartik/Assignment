import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PipelineForm from './pipelineForm'; // Ensure this is the correct path

const Dashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState(null); // State for editing

  // Fetch pipelines from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/pipelines').then((response) => {
      setPipelines(response.data);
    });
  }, []);

  // Open form for editing a pipeline
  const handleEditPipeline = (pipeline) => {
    setEditingPipeline(pipeline); // Set the pipeline to edit
    setShowForm(true); // Show the form
  };

  // Delete a pipeline
  const handleDeletePipeline = async (pipelineId) => {
    try {
      await axios.delete(`http://localhost:5000/api/pipelines/${pipelineId}`);
      setPipelines(pipelines.filter((pipeline) => pipeline._id !== pipelineId)); // Update the UI
    } catch (error) {
      console.error('Error deleting pipeline:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between items-center'>
      <h1 className="text-2xl font-bold">Data Pipelines</h1>
      <button
        onClick={() => {
          setEditingPipeline(null); // Reset editing state for a new pipeline
          setShowForm(true);
        }}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create New Pipeline
      </button>
      </div>
      {/* Pipeline Form */}
      {showForm && (
        <PipelineForm
          setShowForm={setShowForm}
          editingPipeline={editingPipeline}
          setEditingPipeline={setEditingPipeline}
        />
      )}

      {/* List of Pipelines */}
      <ul className="my-4">
        {pipelines.map((pipeline) => (
          <li key={pipeline._id} className="border p-4 mb-5">
            <h2 className="text-xl font-semibold">{pipeline.name}</h2>
            <p>{pipeline.description}</p>
            <div className='flex justify-between mt-4'>
              <div>
              <button
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Run Pipeline
            </button>
              </div>
            <div>
            <button
              onClick={() => handleEditPipeline(pipeline)}
              className="bg-yellow-500 text-white p-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeletePipeline(pipeline._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            
            </button></div></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
