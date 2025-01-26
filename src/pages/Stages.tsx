import React, { useState } from 'react';
import { Grip, Check, Eye, Folder, FileText } from 'lucide-react';

const workOrders = [
    {
        id: 'WO-001',
        title: 'Downtown Office Complex',
        description: 'Multi-story office building construction',
        columns: [
            {
                id: 'acquire-raw-materials',
                title: 'Acquire Raw Materials',
                tasks: [
                    {
                        id: '1',
                        title: 'Foundation Design',
                        priority: 'high',
                        proposedQuantity: 1,
                        proposedBudget: 50000,
                        assignedTo: 'Structural Engineering Team',
                        images: ['https://cdn.thefabricator.com/a/agile-cost-estimating-with-erp-software-1678721258.JPG']
                    }
                ]
            },
            {
                id: 'shaping',
                title: 'Shaping',
                tasks: [
                    {
                        id: '2',
                        title: 'Steel Framework',
                        priority: 'high',
                        proposedQuantity: 1,
                        proposedBudget: 75000,
                        assignedTo: 'Construction Team',
                        images: ['https://cdn.thefabricator.com/a/agile-cost-estimating-with-erp-software-1678721258.JPG']
                    }
                ]
            },

            {
                id: 'electrical',
                title: 'Electrical',
                tasks: [
                    {
                        id: '4',
                        title: 'Install Electrical System',
                        priority: 'medium',
                        proposedQuantity: 1,
                        proposedBudget: 40000,
                        assignedTo: 'Electrical Team',
                        images: ['https://example.com/electrical.jpg']
                    }
                ]
            },
            {
                id: 'finishing',
                title: 'Finishing',
                tasks: [
                    {
                        id: '5',
                        title: 'Interior Finishing',
                        priority: 'low',
                        proposedQuantity: 1,
                        proposedBudget: 20000,
                        assignedTo: 'Interior Design Team',
                        images: ['https://example.com/finishing.jpg']
                    }
                ]
            },

        ]
    },
    // Second work order remains the same
];

const Stages = () => {
    const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
    const [workOrderColumns, setWorkOrderColumns] = useState(null);
    const [dragState, setDragState] = useState(null);
    const [reviewImages, setReviewImages] = useState({});

    const handleDragStart = (e, task, sourceColumnIndex) => {
        setDragState({ task, sourceColumnIndex });
        e.dataTransfer.setData('text/plain', '');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetColumnIndex) => {
        if (!dragState || targetColumnIndex === dragState.sourceColumnIndex) return;

        const newColumns = [...workOrderColumns];
        const sourceColumn = newColumns[dragState.sourceColumnIndex];
        const targetColumn = newColumns[targetColumnIndex];

        // Remove task from source column
        sourceColumn.tasks = sourceColumn.tasks.filter(
            task => task.id !== dragState.task.id
        );

        // Add task to target column
        targetColumn.tasks.push(dragState.task);

        setWorkOrderColumns(newColumns);
        setDragState(null);
    };

    const toggleReviewImages = (taskId) => {
        setReviewImages(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    const renderKanbanBoard = () => {
        return (
            <div className="grid grid-cols-4 gap-4">
                {workOrderColumns.map((column, columnIndex) => (
                    <div
                        key={column.id}
                        className="bg-white shadow-md rounded-lg h-screen"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, columnIndex)}
                    >
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{column.title}</h2>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {column.tasks.length}
                            </span>
                        </div>
                        <div className="p-2 space-y-2">
                            {column.tasks.map((task, taskIndex) => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task, columnIndex)}
                                    className="p-3 bg-blue-50 rounded-lg cursor-move hover:bg-blue-100"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-medium text-sm">{task.title}</h3>
                                            <p className="text-xs text-gray-600">
                                                Assigned: {task.assignedTo}
                                            </p>
                                        </div>
                                        <span className="text-xs font-bold text-blue-600">
                                            ${task.proposedBudget}
                                        </span>
                                    </div>

                                    {task.images && (
                                        <div className="mt-2">
                                            <button
                                                onClick={() => toggleReviewImages(`${task.id}`)}
                                                className="flex items-center text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition"
                                            >
                                                <Eye className="w-4 h-4 mr-1" /> Review
                                            </button>

                                            {reviewImages[task.id] && (

                                                <div className=" gap-2 mt-2 flex flex-col">
                                                    {task.images.map((img, index) => (
                                                        <img
                                                            key={index}
                                                            src={img}
                                                            alt={`Review ${index + 1}`}
                                                            className="w-full h-20 object-cover rounded"
                                                        />

                                                    ))}
                                                    <div> <span className='font-semibold'>Note: </span> There are only 4 spirals. Kindly check</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6 w-screen">
            <div className="container mx-auto w-full">
                <h1 className="text-2xl font-bold mb-6">Construction Work Orders</h1>

                {!selectedWorkOrder ? (
                    <div className="flex flex-row gap-4">
                        {workOrders.map((order) => (
                            <div
                                key={order.id}
                                onClick={() => {
                                    setSelectedWorkOrder(order);
                                    setWorkOrderColumns(order.columns);
                                }}
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                            >
                                <div className="flex items-center mb-2">
                                    <Folder className="mr-2 text-blue-500" />
                                    <h2 className="font-bold">{order.title}</h2>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{order.description}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <FileText className="mr-1 w-4 h-4" />
                                    Work Order: {order.id}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center mb-6">
                            <button
                                onClick={() => {
                                    setSelectedWorkOrder(null);
                                    setWorkOrderColumns(null);
                                }}
                                className="mr-4 bg-gray-200 px-3 py-2 rounded"
                            >
                                ← Back to Work Orders
                            </button>
                            <h2 className="text-xl font-bold">{selectedWorkOrder.title}</h2>
                        </div>
                        {workOrderColumns && renderKanbanBoard()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stages;