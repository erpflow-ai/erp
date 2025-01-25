import React from 'react';
import { 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Package,
  Users,
  Calendar,
  ClipboardList
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { icon: ClipboardList, label: 'Active Work Orders', value: '24', change: '+12%', color: 'blue' },
    { icon: Package, label: 'Low Stock Items', value: '8', change: '-3', color: 'red' },
    { icon: Users, label: 'Active Vendors', value: '156', change: '+8', color: 'green' },
    { icon: Calendar, label: 'Upcoming Events', value: '12', change: '+5', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-gray-500">Last updated: Just now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-${stat.color}-600 text-sm font-medium`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Project Progress</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project) => (
              <div key={project}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{project}</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { message: 'Low stock alert: Cement (5 bags remaining)', type: 'warning' },
              { message: 'Project Delta deadline approaching', type: 'info' },
              { message: 'New vendor application received', type: 'success' },
            ].map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 text-yellow-700'
                    : alert.type === 'info'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}