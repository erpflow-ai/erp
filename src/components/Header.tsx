import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="font-medium">John Doe</span>
            <button className="p-1 rounded-full bg-gray-100">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}