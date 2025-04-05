import { useState, useEffect } from 'react';
import { BarChart3, Users, BookOpen, Award, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    certificates: 0,
    activeAdmins: 0
  });

  useEffect(() => {
    // Fetch stats from your API
    Promise.all([
      fetch('/api/users/get/all').then(res => res.json()),
      fetch('/api/courses').then(res => res.json()),
      fetch('/api/admin/certificates').then(res => res.json()),
      fetch('/api/admins').then(res => res.json())
    ]).then(([users, courses, certificates, admins]) => {
      setStats({
        users: users.users?.length || 0,
        courses: courses.courses?.length || 0,
        certificates: certificates.certificates?.length || 0,
        activeAdmins: admins.admins?.length || 0
      });
    });
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.courses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificates}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAdmins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Activity items would be mapped here */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;