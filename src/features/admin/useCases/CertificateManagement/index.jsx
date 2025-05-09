import React, { useState, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/certificates');
        if (!response.ok) throw new Error('Failed to fetch certificates');
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const filteredCerts = certificates.filter(cert => {
    const search = searchTerm.toLowerCase();
    return (
      (cert.userName || '').toLowerCase().includes(search) ||
      (cert.courseTitle || '').toLowerCase().includes(search) ||
      (cert.certificateId || '').toLowerCase().includes(search) ||
      (cert.score || '').toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="container py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Certificate Management</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Issued On</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCerts.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">
                  {cert.certificateId}
                </TableCell>
                <TableCell>{cert.userName}</TableCell>
                <TableCell>{cert.courseTitle}</TableCell>
                <TableCell>
                  {new Date(cert.issueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{cert.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCertificates;