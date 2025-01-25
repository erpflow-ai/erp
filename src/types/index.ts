// Common Types
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Status = 'pending' | 'in-progress' | 'completed' | 'delayed';

export interface WorkOrder {
  id: string;
  projectName: string;
  location: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  description: string;
  attachments: string[];
  status: Status;
  comments: Comment[];
}

export interface Material {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  unitCost: number;
  supplier: string;
  reorderPoint: number;
  allocated: { [workOrderId: string]: number };
}

export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  resources: string[];
  dependencies: string[];
  completed: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
  specialties: string[];
  activeProjects: string[];
}