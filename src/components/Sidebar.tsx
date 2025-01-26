import React from 'react';
import {
  ClipboardList,
  Package,
  Calendar,
  Users,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import aurigo_logo from '../assets/aurigo_logo.webp';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ClipboardList, label: 'Work Orders', path: '/workorder' },
  { icon: Package, label: 'Materials', path: '/materials' },
  { icon: Calendar, label: 'Stages', path: '/stages' },
  { icon: Users, label: 'Vendors', path: '/vendors' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <div className="h-screen min-w-64 w-64 bg-[#1c1c1c] text-white p-4 ">
      <div className="flex items-center gap-2 mb-8">
        <img src={aurigo_logo} className='h-[60px] w-auto' alt="aurigo-logo" />
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