import { Download, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useRef } from 'react';
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

    // Certificate data - in a real app, you would fetch this based on the ID
    const certificate = {
        id: id,
        name: 'Yassine EL AOUNI',
        skill: 'Marketing with Canva',
        date: 'April 4, 2025',
        score: '18/20 (90%)',
        issuer: "DIGILEARN Academy",
        title: "Course Instructor"
    };

    const handleDownload = async () => {
        try {
            const input = certificateRef.current;
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null
            });

            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
                description: "Could not generate certificate",
                variant: "destructive",
            });
        }
    };

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
                            Earned on {certificate.date} with score {certificate.score}
                        </p>
                    </motion.div>

                    {/* Certificate Preview - Mobile Responsive */}
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

                            {/* Logos - Responsive Sizing */}
                            <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between z-10">
                                <img
                                    src={companyLogo}
                                    alt="Company Logo"
                                    className="h-16 md:h-24"
                                />
                                <img
                                    src={universityLogo}
                                    alt="University Logo"
                                    className="h-12 md:h-16"
                                />
                            </div>

                            {/* Content Container - Responsive Padding */}
                            <div className="relative z-10 h-full flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 text-center">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-gray-800 mb-2 md:mb-4">
                                    CERTIFICATE OF ACHIEVEMENT
                                </h2>

                                <p className="text-sm sm:text-base md:text-xl text-gray-500 italic">
                                    This is to certify that
                                </p>

                                {/* Name with responsive sizing */}
                                <div className="relative my-4 md:my-6 w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-gray-800 px-4 sm:px-6 md:px-8 tracking-wider">
                                            {certificate.name}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base md:text-xl text-gray-500 max-w-2xl mb-2 md:mb-4">
                                    has successfully completed the course assessment for
                                </p>

                                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-gray-800 mb-4 md:mb-6">
                                    {certificate.skill}
                                </h4>

                                <p className="text-sm sm:text-base md:text-xl font-bold text-gray-800">
                                    Awarded on {certificate.date}
                                </p>
                            </div>

                            {/* Bottom Section - Responsive Layout */}
                            <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-0 right-0 flex flex-col sm:flex-row justify-between px-4 sm:px-8 md:px-12 z-10 space-y-4 sm:space-y-0">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={adminSignature}
                                        alt="Signature"
                                        className="h-10 md:h-12 mb-1 md:mb-2"
                                    />
                                    <p className="text-xs sm:text-sm md:text-base font-bold text-gray-800">{certificate.issuer}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{certificate.title}</p>
                                </div>

                                <div className="flex flex-col justify-center items-center sm:items-end">
                                    <img
                                        src={DigilearnAcademy}
                                        alt="DIGILEARN Academy"
                                        className="h-12 md:h-16"
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
                        >
                            <Download className="h-5 w-5" />
                            Download PDF
                        </Button>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default CertificateDetail;