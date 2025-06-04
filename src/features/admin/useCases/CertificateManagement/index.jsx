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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/certificates/admin/certificates');
        if (!response.ok) throw new Error('Failed to fetch certificates');
        const data = await response.json();

        // Transform the data to match expected structure
        const transformedCertificates = data.certificates.map(cert => ({
          ...cert,
          userName: cert.user?.name || 'Unknown',
          courseTitle: cert.course?.title || 'Unknown'
        }));

        setCertificates(transformedCertificates);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
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

  if (error) {
    return (
      <div className="container py-8">
        <div className="text-red-500">Erreur : {error}</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des Certificats</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des certificats..."
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
              <TableHead>ID du Certificat</TableHead>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Cours</TableHead>
              <TableHead>Date d'Émission</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">
                    {cert.certificateId}
                  </TableCell>
                  <TableCell>{cert.userName}</TableCell>
                  <TableCell>{cert.courseTitle}</TableCell>
                  <TableCell>
                    {new Date(cert.issueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>{cert.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Aucun certificat trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCertificates;