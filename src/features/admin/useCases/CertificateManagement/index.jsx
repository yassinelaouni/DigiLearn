import { useState, useEffect } from 'react';
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
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/admin/certificates')
      .then(res => res.json())
      .then(data => setCertificates(data.certificates || []));
  }, []);

  const filteredCerts = certificates.filter(cert =>
    cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerify = (certificateId) => {
    fetch(`/api/admin/certificates/verify/${certificateId}`, {
      method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setCertificates(certs => certs.map(c => 
          c.certificateId === certificateId ? { ...c, isVerified: true } : c
        ));
      }
    });
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
                  <Button variant="ghost" size="sm">
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