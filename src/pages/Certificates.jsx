import { Award, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [suggestedCourses, setSuggestedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const userId = "68152e9b92f42938445d56d0";

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                // Correct way to include the userId in the endpoint
                const response = await fetch(`http://localhost:5000/api/certificates/users/${userId}/certificates`);
                const data = await response.json();

                if (data.success) {
                    setCertificates(data.certificates);
                } else {
                    toast({
                        title: "Error loading certificates",
                        description: data.errorMessage,
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "Network error",
                    description: "Failed to fetch certificates",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        // Fetch suggested courses
        // In your fetchSuggestedCourses function
        const fetchSuggestedCourses = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/courses/suggested?userId=${userId}&limit=3`
                );
                const data = await response.json();

                if (data.success) {
                    setSuggestedCourses(data.courses.slice(0, 3)); // Double ensure only 3
                }
            } catch (error) {
                setSuggestedCourses([]);
            }
        };

        fetchCertificates();
        fetchSuggestedCourses();
    }, [toast]);

    if (loading) {
        return (
            <Layout>
                <div className="container py-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6">My Certificates</h1>
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">My Certificates</h1>

                    {certificates.length === 0 ? (
                        <div className="bg-white rounded-lg border p-8 text-center">
                            <div className="mx-auto mb-6 flex justify-center">
                                <div className="bg-blue-100 p-6 rounded-full">
                                    <Award className="h-12 w-12 text-blue-600" />
                                </div>
                            </div>

                            <h2 className="text-xl font-medium mb-2">You don't have any certificates yet</h2>
                            <p className="text-muted-foreground mb-6">
                                Get your certificate with these courses
                            </p>

                            <div className="mt-8 space-y-4 text-left max-w-2xl mx-auto">
                                {suggestedCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gray-100 p-3 rounded-lg">
                                                <BookOpen className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{course.title}</h3>
                                                <p className="text-sm text-muted-foreground">{course.category}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link to={`/courses/${course.slug}`}>
                                                Start Course <ArrowRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button asChild>
                                    <Link to="/courses">
                                        Browse All Courses
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {certificates.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow h-64" // Added fixed height
                                    >
                                        <div className="p-6 border-b h-[calc(100%-72px)]"> {/* Adjusted height calculation */}
                                            <div className="flex justify-between items-start mb-4">
                                                <Award className="h-10 w-10 text-yellow-500" />
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(cert.issueDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-1">{cert.courseTitle}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Certificate ID: {cert.certificateId}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gray-50 h-18"> {/* Fixed button container height */}
                                            <Button className="w-full" asChild>
                                                <Link
                                                    to={`/certificates/${cert.certificateId}`}
                                                    state={{ certificateData: cert }}
                                                >
                                                    View Certificate
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-lg border p-6">
                                <h2 className="text-xl font-bold mb-6">Get more certificates with these courses</h2>
                                <div className="space-y-4">
                                    {suggestedCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gray-100 p-3 rounded-lg">
                                                    <BookOpen className="h-5 w-5 text-gray-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{course.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{course.category}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link to={`/courses/${course.slug}`}>
                                                    Start Course <ArrowRight className="h-4 w-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Certificates;