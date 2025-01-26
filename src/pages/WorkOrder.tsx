import React, { useEffect, useState } from 'react';
import {
    ChevronDown,
    ChevronRight,
    Package,
    Grid,
    List,
    PlusCircle
} from 'lucide-react';
import axios from 'axios';


// Utility Functions
const getStatusColor = (status) => {
    switch (status) {
        case 'In Progress': return 'bg-blue-100 text-blue-800';
        case 'Planning': return 'bg-yellow-100 text-yellow-800';
        case 'Completed': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-700';
    }
};

// Components
const WorkOrderCard = ({ workOrder, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`border rounded-lg p-4 mb-2 ${depth > 0 ? 'ml-' + (depth * 4) : ''}`}>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    {workOrder.subWorkOrders && workOrder.subWorkOrders.length > 0 && (
                        <button onClick={() => setIsExpanded(!isExpanded)} className="mr-2">
                            {isExpanded ? <ChevronDown /> : <ChevronRight />}
                        </button>
                    )}
                    <span className="font-medium">{workOrder.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(workOrder.status)}`}>
                    {workOrder.status}
                </span>
            </div>

            {/* BOM Details */}
            <div className="bg-gray-50 rounded p-2">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <Package className="mr-2 text-gray-600" size={16} />
                        <span className="font-semibold text-sm">Bill of Materials</span>
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                        Total: ${workOrder.totalBomCost.toLocaleString()}
                    </span>
                </div>
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-1">Item</th>
                            <th className="text-right py-1">Price</th>
                            <th className="text-left py-1">Vendor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workOrder.bomItems.map(item => (
                            <tr key={item.id} className="border-b last:border-b-0">
                                <td className="py-1">{item.name}</td>
                                <td className="text-right py-1">${item.price.toLocaleString()}</td>
                                <td className="py-1">{item.vendor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isExpanded && workOrder.subWorkOrders && (
                <div className="mt-2">
                    {workOrder.subWorkOrders.map(subOrder => (
                        <WorkOrderCard
                            key={subOrder.id}
                            workOrder={subOrder}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const WorkOrdersPage = () => {
    useEffect(() => {
        const fetchProjects = () => {
            axios.get('http://localhost:8000/dashboard/projects')
                .then(response => {
                    console.log(response.data);
                    setProjects(response.data);
                    setSelectedProject(response.data[0]);
                })
                .catch(error => {
                    console.error('There was an error fetching the projects!', error);
                });
        };

        const fetchWorkOrders = () => {
            axios.get('http://localhost:8000/dashboard/workorders')
                .then(response => {
                    console.log(response.data);
                    setWorkOrders(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the work orders!', error);
                });
        };

        fetchProjects();
        fetchWorkOrders();

        const interval = setInterval(() => {
            fetchProjects();
            fetchWorkOrders();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const [projects, setProjects] = useState([{
        id: 1,
        name: "Website Redesign",
        capital: 50000,
        duration: "3 months",
        status: "In Progress",
        inventoryStatus: "Partially Stocked",
        customer: "Acme Corporation"
    }]);
    const [selectedProject, setSelectedProject] = useState({
        id: 1,
        name: "Website Redesign",
        capital: 50000,
        duration: "3 months",
        status: "In Progress",
        inventoryStatus: "Partially Stocked",
        customer: "Acme Corporation"
    });
    const [workOrders, setWorkOrders] = useState([]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-12 gap-4">
                    {/* Project Sidebar */}
                    <div className="col-span-3 bg-white border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Projects</h2>
                            <button className="text-[#EE3136] hover:text-[#f05b60]">
                                <PlusCircle />
                            </button>
                        </div>
                        {projects && projects.map(project => (
                            <div
                                key={project.id}
                                className={`p-3 rounded-lg mb-2 cursor-pointer ${selectedProject.id === project.id
                                    ? 'bg-blue-100 border border-blue-300'
                                    : 'hover:bg-gray-100'
                                    }`}
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{project.name}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    captial: ${project.capital}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Work Orders Graph */}
                    <div className="col-span-9 bg-white border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedProject.name} - Work Orders</h2>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <Grid />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <List />
                                </button>
                            </div>
                        </div>

                        {/* Work Orders */}
                        <div>
                            {workOrders && workOrders
                                .filter(wo => wo.projectId === selectedProject.id)
                                .map(workOrder => (
                                    <WorkOrderCard
                                        key={workOrder.id}
                                        workOrder={workOrder}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkOrdersPage;