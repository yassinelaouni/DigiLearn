import React, { useState, useEffect } from 'react';
import { Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState({
    fetching: true,
    submitting: false
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch admin data');
        }

        if (!data.admin) {
          throw new Error('Admin data not found');
        }

        console.log('Received admin data:', data.admin);

        setFormData(prev => ({
          ...prev,
          firstName: data.admin.firstName || '',
          lastName: data.admin.lastName || '',
          email: data.admin.email || ''
        }));
      } catch (error) {
        console.error('Fetch error:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setLoading(prev => ({ ...prev, fetching: false }));
      }
    };

    fetchAdminData();
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, submitting: true }));

    try {
      const response = await fetch('http://localhost:5000/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          ...(formData.newPassword && {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword
          })
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to update settings');
      }

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  if (loading.fetching && !formData.firstName) {
    return (
      <div className="container py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Settings */}
        <div className="border rounded-lg">
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5" />
              <h2 className="font-semibold">Account Settings</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading.submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading.submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading.submitting}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="border rounded-lg">
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5" />
              <h2 className="font-semibold">Security</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                disabled={loading.submitting}
                placeholder="Required for password changes"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                disabled={loading.submitting}
                placeholder="Leave blank to keep current"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading.submitting}
                placeholder="Required if changing password"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSubmit}
          disabled={loading.submitting || loading.fetching}
        >
          {loading.submitting ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;