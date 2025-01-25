import React from 'react';
import { 
  ClipboardList, 
  Package, 
  Calendar, 
  Users, 
  LayoutDashboard,
  Settings
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ClipboardList, label: 'Work Orders', path: '/work-orders' },
  { icon: Package, label: 'Materials', path: '/materials' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Users, label: 'Vendors', path: '/vendors' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-8">
        <Package className="h-8 w-8 text-blue-400" />
        <h1 className="text-xl font-bold">BuildERP</h1>
      </div>
      
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-1"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}