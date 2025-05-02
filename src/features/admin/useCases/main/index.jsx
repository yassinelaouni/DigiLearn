import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await fetch('/api/admin/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Fallback data if API doesn't respond
  const safeStats = stats || {
    totalUsers: 0,
    totalCourses: 0,
    totalCertificates: 0
  };

  // Simple percentage bars for visualization
  const ProgressBar = ({ value, max = 100, color = 'bg-blue-500' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      ></div>
    </div>
  );

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-full bg-blue-100">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{safeStats.totalUsers}</div>
            <ProgressBar value={safeStats.totalUsers} max={500} />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.min((safeStats.totalUsers / 500) * 100, 100).toFixed(0)}% of target
            </p>
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <div className="p-2 rounded-full bg-purple-100">
              <BookOpen className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{safeStats.totalCourses}</div>
            <ProgressBar value={safeStats.totalCourses} max={20} color="bg-purple-500" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.min((safeStats.totalCourses / 20) * 100, 100).toFixed(0)}% of goal
            </p>
          </CardContent>
        </Card>

        {/* Certificates Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <div className="p-2 rounded-full bg-orange-100">
              <Award className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{safeStats.totalCertificates}</div>
            <ProgressBar value={safeStats.totalCertificates} max={safeStats.totalUsers || 1} color="bg-orange-500" />
            <p className="text-xs text-muted-foreground mt-2">
              {safeStats.totalUsers > 0 
                ? `${Math.round((safeStats.totalCertificates / safeStats.totalUsers) * 100)}% of users certified`
                : 'No users yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Simple Visualization Section */}
      <div className="bg-white rounded-lg border p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Certification Rate</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {safeStats.totalUsers}
            </div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </div>
          <div className="flex-1 text-center">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500" 
                style={{ 
                  width: `${safeStats.totalUsers > 0 
                    ? Math.min((safeStats.totalCertificates / safeStats.totalUsers) * 100, 100) 
                    : 0}%` 
                }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {safeStats.totalCertificates}
            </div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;