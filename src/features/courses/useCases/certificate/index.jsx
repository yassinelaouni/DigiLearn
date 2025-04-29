import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Import images
import certificateBg from '/bg.png';
import universityLogo from '/fste.png';
import companyLogo from '/logoCertificate.png';
import adminSignature from '/signature.png';
import DigilearnAcademy from '/DIGILEARNAcademy.png';

const CertificateGenerator = ({ userData }) => {
  const mockUserData = {
    name: "VAISHNAVI VAIDYA",
    skill: "REACT (BASIC)",
    date: "20Apr,2022",
    issuer: "DIGILEARN Academy",
    title: "CTO, HackerRank"
  };

  const data = userData || mockUserData;
  const certificateRef = useRef();

  const handleDownload = () => {
    const input = certificateRef.current;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data.name.replace(/\s+/g, '_')}_certificate.pdf`);
    }).catch(err => console.error('Error generating PDF:', err));
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Box ref={certificateRef} sx={{
        width: '1000px',
        height: '720px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {/* Background Image */}
        <img
          src={certificateBg}
          alt="Certificate Background"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />

        {/* Top Left Company Logo */}
        <img
          src={companyLogo}
          alt="Company Logo"
          style={{
            position: 'absolute',
            top: '10px',
            left: '20px',
            height: '110px',
            zIndex: 1
          }}
        />

        {/* Top Right University Logo */}
        <img
          src={universityLogo}
          alt="University Logo"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            height: '80px',
            zIndex: 1
          }}
        />

        {/* Content Container */}
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          textAlign: 'center'
        }}>
          {/* Certificate Title */}
          <Typography variant="h3" sx={{
            color: '#2c3e50',
            fontWeight: 'bold',
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            CERTIFICATE
          </Typography>

          {/* Introductory Text */}
          <Typography variant="h5" sx={{
            color: '#7f8c8d',
            mb: 2,
            fontStyle: 'italic'
          }}>
            This is to certify that
          </Typography>

          {/* Student Name */}
          <Typography variant="h2" sx={{
            fontWeight: 'bold',
            color: '#2c3e50',
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {data.name}
          </Typography>

          {/* Skill Completed */}
          <Typography variant="h5" sx={{
            color: '#7f8c8d',
            mb: 2,
            maxWidth: '600px'
          }}>
            has successfully cleared the assessment for the skill
          </Typography>

          {/* Skill Name */}
          <Typography variant="h4" sx={{
            color: '#2c3e50',
            mb: 2,
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {data.skill}
          </Typography>

          {/* Date */}
          <Typography variant="h5" sx={{
            color: '#2c3e50',
            mb: 4,
            fontWeight: 'bold'
          }}>
            {data.date}
          </Typography>
        </Box>

        {/* Bottom Signatures and Logos */}
        <Box sx={{
          position: 'absolute',
          bottom: '60px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 60px',
          zIndex: 1
        }}>
          {/* Signature and Issuer (Left) */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <img
              src={adminSignature}
              alt="Signature"
              style={{ height: '50px', marginBottom: '10px' }}
            />
            <Typography variant="h6" sx={{ 
              color: '#2c3e50',
              fontWeight: 'bold',
              mb: 0.5
            }}>
              {data.issuer}
            </Typography>
            <Typography variant="body1" sx={{ color: '#2c3e50' }}>
              {data.title}
            </Typography>
          </Box>

          {/* DIGILEARN Academy Logo (Right) */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <img
              src={DigilearnAcademy}
              alt="DIGILEARN Academy"
              style={{ height: '90px' }}
            />
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={handleDownload}
        sx={{
          mt: 4,
          bgcolor: '#7C66DC',
          '&:hover': { bgcolor: '#5A4CB1' },
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Download Certificate
      </Button>
    </Box>
  );
};

export default CertificateGenerator;