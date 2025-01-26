import React, { useState } from 'react';
import {
    Construction,
    Factory,
    MapPin,
    DollarSign,
    Warehouse,
    PlusCircle,
    Grid,
    List
} from 'lucide-react';

// Government Construction Vendors
const constructionVendors = [
    {
        id: 1,
        name: "National Infrastructure Suppliers",
        location: "New Delhi",
        specialization: "Structural Materials",
        governmentClearance: true
    },
    {
        id: 2,
        name: "Mega Civil Engineering Providers",
        location: "Mumbai",
        specialization: "Concrete Solutions",
        governmentClearance: true
    },
    {
        id: 3,
        name: "Civil Construction Enterprises",
        location: "Kolkata",
        specialization: "Specialized Construction Materials",
        governmentClearance: true
    }
];

// Infrastructure Project Materials
const infrastructureMaterials = [
    {
        id: 1,
        projectName: "Brahmaputra Bridge Project",
        projectType: "Bridge Construction",
        materials: [
            {
                id: 101,
                name: "High-Strength Structural Steel",
                vendor: "National Infrastructure Suppliers",
                specifications: "Grade 50 Reinforced Steel",
                quantity: 500,
                unit: "Metric Tons",
                unitPrice: 75000,
                totalValue: 37500000,
                status: "Approved",
                assignedSection: "Main Bridge Span",
                technicalDetails: [
                    { name: "Tensile Strength", value: "500 MPa" },
                    { name: "Corrosion Resistance", value: "High" }
                ]
            },
            {
                id: 102,
                name: "Advanced Concrete Mix",
                vendor: "Mega Civil Engineering Providers",
                specifications: "High-Performance Waterproof Concrete",
                quantity: 2000,
                unit: "Cubic Meters",
                unitPrice: 25000,
                totalValue: 50000000,
                status: "Pending Approval",
                assignedSection: "Foundation and Pillars",
                technicalDetails: [
                    { name: "Compressive Strength", value: "65 MPa" },
                    { name: "Water Absorption", value: "<0.5%" }
                ]
            }
        ]
    },
    {
        id: 2,
        projectName: "Himalayan Dam Development",
        projectType: "Hydroelectric Dam",
        materials: [
            {
                id: 201,
                name: "Seismic-Resistant Cement",
                vendor: "Civil Construction Enterprises",
                specifications: "Earthquake Zone Compliant Cement",
                quantity: 1500,
                unit: "Metric Tons",
                unitPrice: 50000,
                totalValue: 75000000,
                status: "In Procurement",
                assignedSection: "Dam Foundation",
                technicalDetails: [
                    { name: "Seismic Performance", value: "Zone V Compliant" },
                    { name: "Setting Time", value: "Initial 30 mins, Final 600 mins" }
                ]
            }
        ]
    }
];

// Status Color Mapping
const getStatusColor = (status) => {
    switch (status) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
        case 'In Procurement': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-700';
    }
};

// Material Card Component
const MaterialCard = ({ material }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border rounded-lg p-4 mb-4 bg-white">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <Construction className="mr-3 text-gray-600" size={24} />
                    <h3 className="font-semibold text-lg">{material.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(material.status)}`}>
                    {material.status}
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3 bg-gray-50 p-3 rounded">
                <div className="flex items-center">
                    <Factory className="mr-2 text-gray-600" size={16} />
                    <span>Vendor: {material.vendor}</span>
                </div>
                <div className="flex items-center">
                    <MapPin className="mr-2 text-gray-600" size={16} />
                    <span>Section: {material.assignedSection}</span>
                </div>
                <div className="flex items-center">
                    <DollarSign className="mr-2 text-gray-600" size={16} />
                    <span>Total Value: ₹{material.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                    <Warehouse className="mr-2 text-gray-600" size={16} />
                    <span>Quantity: {material.quantity} {material.unit}</span>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                    {isExpanded ? "Hide" : "View"} Technical Details
                </button>
            </div>

            {isExpanded && (
                <div className="mt-3 bg-gray-100 p-3 rounded">
                    <h4 className="font-semibold mb-2">Technical Specifications</h4>
                    <table className="w-full text-sm">
                        <tbody>
                            {material.technicalDetails.map((detail, index) => (
                                <tr key={index} className="border-b last:border-b-0">
                                    <td className="py-2 font-medium">{detail.name}</td>
                                    <td className="py-2 text-right">{detail.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// Main Materials Management Page
const ConstructionMaterialsPage = () => {
    const [selectedProject, setSelectedProject] = useState(infrastructureMaterials[0]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-12 gap-4">
                    {/* Projects Sidebar */}
                    <div className="col-span-3 bg-white border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Infrastructure Projects</h2>
                            <button className="text-blue-500 hover:text-blue-700">
                                <PlusCircle />
                            </button>
                        </div>
                        {infrastructureMaterials.map(project => (
                            <div
                                key={project.id}
                                className={`p-3 rounded-lg mb-2 cursor-pointer ${selectedProject.id === project.id
                                    ? 'bg-blue-100 border border-blue-300'
                                    : 'hover:bg-gray-100'
                                    }`}
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{project.projectName}</span>
                                    {/* <Bridge size={20} className="text-gray-600" /> */}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {project.projectType}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Materials Section */}
                    <div className="col-span-9 bg-white border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {selectedProject.projectName} - Materials
                            </h2>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <Grid />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <List />
                                </button>
                            </div>
                        </div>

                        {/* Materials List */}
                        <div>
                            {selectedProject.materials.map(material => (
                                <MaterialCard
                                    key={material.id}
                                    material={material}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConstructionMaterialsPage;