import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import MagicButton from '../components/ErpAiButton';
import { useEffect } from 'react';
import axios from 'axios';

// Sample initial project data
const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    capital: 50000,
    duration: "3 months",
    status: "In Progress",
    inventoryStatus: "Partially Stocked",
    customer: "Acme Corporation"
  },
  {
    id: 2,
    name: "Mobile App Development",
    capital: 75000,
    duration: "6 months",
    status: "Planning",
    inventoryStatus: "Not Started",
    customer: "Tech Innovations Inc."
  },
  {
    id: 3,
    name: "Cloud Migration",
    capital: 100000,
    duration: "4 months",
    status: "Completed",
    inventoryStatus: "Fully Stocked",
    customer: "Global Enterprises"
  }
];



// Status color mapping
const getStatusColor = (status) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Planning': return 'bg-yellow-100 text-yellow-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Inventory status color mapping
const getInventoryColor = (status) => {
  switch (status) {
    case 'Fully Stocked': return 'bg-green-100 text-green-800';
    case 'Partially Stocked': return 'bg-yellow-100 text-yellow-800';
    case 'Not Started': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ProjectManagementPage = () => {
  useEffect(() => {
    axios.get('http://localhost:8000/dashboard/projects')
      .then(response => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for deleting a project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Handler for toggling the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-6 bg-white">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Ongoing Projects</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={toggleModal}
          >
            + Add New Project
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Project Name', 'capital', 'Duration', 'Status', 'Inventory Status', 'Customer', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">{project.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">${project.capital.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{project.duration}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInventoryColor(project.inventoryStatus)}`}>
                      {project.inventoryStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{project.customer}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <Eye
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        size={20}
                        onClick={() => console.log(`View project ${project.id}`)}
                      />
                      <Edit
                        className="text-green-500 cursor-pointer hover:text-green-700"
                        size={20}
                        onClick={() => console.log(`Edit project ${project.id}`)}
                      />
                      <Trash2
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        size={20}
                        onClick={() => handleDeleteProject(project.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 right-0 flex items-center justify-center pl-[10%] bg-black bg-opacity-50">
          <div className="bg-white w-[40%] p-6 rounded-lg shadow-lg flex flex-col space-y-4">
            <div className='w-full flex items-center justify-between'>
              <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
              <MagicButton />
            </div>

            <input
              type="text"
              placeholder="Project Name"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Estimated Duration"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              placeholder="capital"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Customer Name"
              className="border border-gray-300 p-2 rounded"
            />
            <button
              className="bg-[#000000] transition-all duration-300 text-white px-4 py-2 rounded hover:bg-[#383838]"
              onClick={toggleModal}
            >
              Submit
            </button>
            <button
              className="border-[1px] transition-all duration-300 border-solid border-black  text-black px-4 py-2 rounded hover:bg-[#e1e1e1]"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagementPage;