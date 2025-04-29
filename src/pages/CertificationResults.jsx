import { CheckCircle2, Share2, Download, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useRef } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import selectAuthUser from "@/features/auth/selectors/user";
import { useLocation } from 'react-router-dom';

// Import your certificate assets
import certificateBg from '/bg.png';
import universityLogo from '/fste.png';
import companyLogo from '/logoCertificate.png';
import adminSignature from '/signature.png';
import DigilearnAcademy from '/DIGILEARNAcademy.png';
import { bottom } from "@popperjs/core";

const CertificationResults = () => {
    const { slug } = useParams();
    const { state } = useLocation();
    const certificateRef = useRef();
    const { toast } = useToast();
    const currentUser = useSelector(selectAuthUser);



    // Process user data with fallbacks
    const stateData = state || {};
    const {
        passed = true,
        score = 18,
        totalQuestions = 20,
        userData: stateUserData
    } = stateData;

    // Calculate passing score (85% of total questions)
    const passingScore = Math.ceil(totalQuestions * 0.85);

    const userData = stateUserData || {
        name: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim() || "Student Name",
        skill: "Marketing with Canva",
        date: new Date().toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }),
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
            const imgHeight = (canvas.height * imgWidth) / canvas.width+6;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${userData.name.replace(/\s+/g, '_')}_certificate.pdf`);

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

    if (!passed) {
        return (
            <Layout>
                <div className="container py-8 md:py-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl font-bold mb-4">Test Results</h1>
                        <p className="text-xl mb-6">
                        Your score: {score}/{totalQuestions} (minimum passing score: {passingScore} - 85%)</p>
                        <Button asChild>
                            <Link to={`/courses/${slug}/certification`}>
                                Try Again
                            </Link>
                        </Button>
                        <div className="mt-12">
                            <Link
                                to={`/courses/${slug}`}
                                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Back to Course
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-4 md:py-8">
                <Link
                    to={`/courses/${slug}`}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Course
                </Link>

                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-3" />
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Congratulations!</h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-4">
                            You passed with a score of {score}/{totalQuestions}
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
                                    className="h-12 md:h-16"
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
                                            {userData.name}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base md:text-xl text-gray-500 max-w-2xl mb-2 md:mb-4">
                                    has successfully completed the course assessment for
                                </p>

                                <h4 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-gray-800 mb-4 md:mb-6">
                                    {userData.skill}
                                </h4>

                                <p className="text-sm sm:text-base md:text-xl font-bold text-gray-800">
                                    Awarded on {userData.date}
                                </p>
                            </div>

                            {/* Bottom Section - Responsive Layout */}
                            <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 left-0 right-0 flex flex-col sm:flex-row justify-between px-4 sm:px-8 md:px-12 z-10 space-y-4 sm:space-y-0">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={adminSignature}
                                        alt="Signature"
                                       width={90} 
                                    />
                                    <p className="text-xs sm:text-sm md:text-base font-bold text-gray-800">{userData.issuer}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{userData.title}</p>
                                </div>

                                <div className="flex flex-col justify-center items-center sm:items-end">
                                    <img
                                        src={DigilearnAcademy}
                                        alt="DIGILEARN Academy"
                                        width={110}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons - Stacked on mobile */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="gap-2 w-full sm:w-auto"
                        >
                            <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                            Share
                        </Button>
                        <Button
                            size="lg"
                            className="gap-2 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                            onClick={handleDownload}
                        >
                            <Download className="h-4 w-4 md:h-5 md:w-5" />
                            Download PDF
                        </Button>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default CertificationResults;