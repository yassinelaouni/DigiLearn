import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAdminStats = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    certificates: 0,
    activeAdmins: 0,
    loading: true,
    error: null
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, loading: true }));
        
        const [usersRes, coursesRes, certsRes, adminsRes] = await Promise.all([
          fetch('/api/users/get/all'),
          fetch('/api/courses'),
          fetch('/api/admin/certificates'),
          fetch('/api/admins')
        ]);

        if (!usersRes.ok || !coursesRes.ok || !certsRes.ok || !adminsRes.ok) {
          throw new Error('Failed to fetch stats');
        }

        const [users, courses, certificates, admins] = await Promise.all([
          usersRes.json(),
          coursesRes.json(),
          certsRes.json(),
          adminsRes.json()
        ]);

        setStats({
          users: users.users?.length || 0,
          courses: courses.courses?.length || 0,
          certificates: certificates.certificates?.length || 0,
          activeAdmins: admins.admins?.length || 0,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      }
    };

    fetchStats();

    // Optional: Set up polling or refresh interval
    const interval = setInterval(fetchStats, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [toast]);

  return stats;
};