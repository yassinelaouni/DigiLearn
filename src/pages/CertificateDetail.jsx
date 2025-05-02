import { Download, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

// Import your certificate assets
import certificateBg from '/bg.png';
import universityLogo from '/fste.png';
import companyLogo from '/logoCertificate.png';
import adminSignature from '/signature.png';
import DigilearnAcademy from '/DIGILEARNAcademy.png';

const CertificateDetail = () => {
    const { id } = useParams();
    const certificateRef = useRef();
    const { toast } = useToast();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);


    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await fetch(`/api/certificates/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setCertificate({
                        ...data.certificate,
                        skill: data.certificate.courseTitle
                    });
                } else {
                    throw new Error(data.errorMessage || 'Certificate not found');
                }
            } catch (error) {
                toast({
                    title: "Error loading certificate",
                    description: error.message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [id, toast]);

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const input = certificateRef.current;
            
            // Wait for images to load
            await new Promise(resolve => {
                const images = input.querySelectorAll('img');
                let loaded = 0;
                
                if (images.length === 0) return resolve();
                
                const onLoad = () => {
                    loaded++;
                    if (loaded === images.length) resolve();
                };
                
                images.forEach(img => {
                    if (img.complete) {
                        loaded++;
                        if (loaded === images.length) resolve();
                    } else {
                        img.addEventListener('load', onLoad);
                        img.addEventListener('error', onLoad); // Continue even if some images fail
                    }
                });
            });
    
            const canvas = await html2canvas(input, {
                scale: 1, // Try with lower scale first
                useCORS: true,
                logging: true, // Enable to see console logs
                backgroundColor: null,
                onclone: (clonedDoc) => {
                    // This can help with styling issues
                    clonedDoc.getElementById('certificate-container').style.visibility = 'visible';
                }
            });
    
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            // Center the image vertically if it's smaller than page height
            const heightLeft = imgHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save(`${certificate.name.replace(/\s+/g, '_')}_certificate.pdf`);
    
            toast({
                title: "Certificate downloaded!",
                description: "Your certificate has been saved",
                variant: "default",
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast({
                title: "Download failed",
                description: error.message || "Could not generate certificate",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="container py-20 text-center">
                    <p>Loading certificate details...</p>
                </div>
            </Layout>
        );
    }

    if (!certificate) {
        return (
            <Layout>
                <div className="container py-20 text-center">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-bold mb-2">Certificate not found</h1>
                        <Button asChild>
                            <Link to="/certificates">Back to Certificates</Link>
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-4 md:py-8">
                <Link
                    to="/certificates"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Certificates
                </Link>

                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Certificate</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-4">
                            Earned on {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} with score {certificate.score}
                        </p>
                    </motion.div>

                    {/* Certificate Preview */}
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="mb-6 overflow-hidden rounded-lg md:rounded-xl border border-gray-200 shadow-md md:shadow-lg"
                    >
                        <div
                            ref={certificateRef}
                            className="relative w-full aspect-[10/7] bg-white"
                            style={{ minHeight: '500px' }}
                        >
                            <img
                                src={certificateBg}
                                alt="Certificate Background"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Logos */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                                <img
                                    src={companyLogo}
                                    alt="Company Logo"
                                    className="h-16"
                                />
                                <img
                                    src={universityLogo}
                                    alt="University Logo"
                                    className="h-16"
                                />
                            </div>

                            {/* Main Content */}
                            <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center">
                                <h2 className="text-4xl font-bold uppercase tracking-wider text-gray-800 mb-4">
                                    CERTIFICATE OF ACHIEVEMENT
                                </h2>

                                <p className="text-xl text-gray-500 italic">
                                    This is to certify that
                                </p>

                                {/* Name with decorative line */}
                                <div className="relative my-6 w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <h3 className="text-4xl font-bold uppercase text-gray-800 px-8 tracking-wider">
                                            {certificate.name}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-xl text-gray-500 max-w-2xl mb-4">
                                    has successfully completed the course assessment for
                                </p>

                                <h4 className="text-3xl font-bold uppercase text-gray-800 mb-6">
                                    {certificate.skill}
                                </h4>

                                <p className="text-xl font-bold text-gray-800">
                                    Awarded on {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Bottom Section */}
                            <div className="absolute bottom-8 left-0 right-0 flex justify-between px-12 z-10">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={adminSignature}
                                        alt="Signature"
                                        width={90}
                                    />
                                    <p className="text-base font-bold text-gray-800">{certificate.issuer}</p>
                                    <p className="text-sm text-gray-600">{certificate.title}</p>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <img
                                        src={DigilearnAcademy}
                                        alt="DIGILEARN Academy"
                                        width={110}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Download Button */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            size="lg"
                            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                            onClick={handleDownload}
                            disabled={isGenerating}
                        >
                            <Download className="h-5 w-5" />
                            {isGenerating ? "Generating..." : "Download PDF"}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default CertificateDetail;