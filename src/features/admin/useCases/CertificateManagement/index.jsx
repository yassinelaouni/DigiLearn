import React, { useState } from 'react';
import { Award, Search, Check, X, Download } from 'lucide-react';
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
  // Mock certificates data
  const [certificates, setCertificates] = useState([
    {
      certificateId: 'CERT-001',
      userId: '1',
      userName: 'John Doe',
      courseId: 'COURSE-101',
      courseTitle: 'Introduction to React',
      issueDate: '2023-05-01T00:00:00Z',
      isVerified: true
    },
    {
      certificateId: 'CERT-002',
      userId: '2',
      userName: 'Jane Smith',
      courseId: 'COURSE-102',
      courseTitle: 'Advanced JavaScript',
      issueDate: '2023-05-15T00:00:00Z',
      isVerified: false
    },
    {
      certificateId: 'CERT-003',
      userId: '3',
      userName: 'Robert Johnson',
      courseId: 'COURSE-103',
      courseTitle: 'Node.js Fundamentals',
      issueDate: '2023-06-01T00:00:00Z',
      isVerified: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCerts = certificates.filter(cert =>
    cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerify = (certificateId) => {
    setCertificates(certs => certs.map(c => 
      c.certificateId === certificateId ? { ...c, isVerified: true } : c
    ));
  };

  const handleDelete = (certificateId) => {
    setCertificates(certs => certs.filter(c => c.certificateId !== certificateId));
  };

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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCerts.map((cert) => (
              <TableRow key={cert.certificateId}>
                <TableCell className="font-medium">
                  {cert.certificateId}
                </TableCell>
                <TableCell>{cert.userName}</TableCell>
                <TableCell>{cert.courseTitle}</TableCell>
                <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {cert.isVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {!cert.isVerified && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => handleVerify(cert.certificateId)}
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(cert.certificateId)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCertificates;