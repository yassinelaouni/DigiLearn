import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAdminUsers = () => {
  const [state, setState] = useState({
    users: [],
    loading: true,
    error: null,
    searchQuery: '',
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10
  });

  const { toast } = useToast();

  const fetchUsers = async (page = 1, search = '') => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const response = await fetch(
        `/api/users/get/all?page=${page}&search=${encodeURIComponent(search)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        users: data.users || [],
        loading: false,
        error: null,
        currentPage: data.meta?.currentPage || 1,
        totalPages: data.meta?.totalPages || 1,
        totalCount: data.meta?.totalCount || 0
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      toast({
        title: "Error loading users",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const searchUsers = (query) => {
    setState(prev => ({ ...prev, searchQuery: query }));
    fetchUsers(1, query);
  };

  const changePage = (page) => {
    setState(prev => ({ ...prev, currentPage: page }));
    fetchUsers(page, state.searchQuery);
  };

  const updateUser = async (userId, updates) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      
      setState(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user.id === userId ? { ...user, ...updatedUser } : user
        )
      }));

      toast({
        title: "Success",
        description: "User updated successfully",
        variant: "default",
      });

      return updatedUser;
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setState(prev => ({
        ...prev,
        users: prev.users.filter(user => user.id !== userId),
        totalCount: prev.totalCount - 1
      }));

      toast({
        title: "Success",
        description: "User deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    ...state,
    fetchUsers,
    searchUsers,
    changePage,
    updateUser,
    deleteUser
  };
};