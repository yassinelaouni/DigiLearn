import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  // Mock stats data (without trend indicators)
  const stats = {
    users: 1250,
    courses: 45,
    certificates: 890
  };

  // Recent activity mock data
  const recentActivity = [
    {
      id: 1,
      type: 'user',
      action: 'New registration',
      name: 'John Smith',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'course',
      action: 'Course completed',
      name: 'Introduction to React',
      user: 'Jane Doe',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'certificate',
      action: 'Certificate issued',
      name: 'Advanced JavaScript',
      user: 'Robert Johnson',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-full bg-blue-100">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <div className="p-2 rounded-full bg-green-100">
              <BookOpen className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.courses}</div>
          </CardContent>
        </Card>

        {/* Certificates Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <div className="p-2 rounded-full bg-purple-100">
              <Award className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificates}</div>
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
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'course' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'user' && <Users className="h-4 w-4" />}
                    {activity.type === 'course' && <BookOpen className="h-4 w-4" />}
                    {activity.type === 'certificate' && <Award className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.name}
                      {activity.user && ` by ${activity.user}`}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;