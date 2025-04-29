import { Award, BookOpen, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from "@/components/layout/Layout";

const Certificates = () => {
    const certificates = [
        {
            id: 'cert-123',
            course: 'Marketing with Canva',
            date: 'April 4, 2025',
            score: '18/20 (90%)',
            downloadUrl: '/certificates/cert-123.pdf'
        },
        {
            id: 'cert-456',
            course: 'Web Development Fundamentals',
            date: 'March 15, 2025',
            score: '17/20 (85%)',
            downloadUrl: '/certificates/cert-456.pdf'
        }
    ];

    // Suggested courses to earn certificates
    const suggestedCourses = [
        {
            id: 'course-1',
            title: 'Advanced Canva Techniques',
            progress: 0,
            totalLessons: 12,
            category: 'Digital Marketing'
        },
        {
            id: 'course-2',
            title: 'React Masterclass',
            progress: 0,
            totalLessons: 24,
            category: 'Programming'
        },
        {
            id: 'course-3',
            title: 'Python for Data Analysis',
            progress: 0,
            totalLessons: 18,
            category: 'Data Science'
        }
    ];

    return (
        <Layout>
            <div className="container py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">My Certificates</h1>

                    {certificates.length === 0 ? (
                        <div className="bg-white rounded-lg border p-8 text-center">
                            {/* Empty State with Large Certificate Icon */}
                            <div className="mx-auto mb-6 flex justify-center">
                                <div className="bg-blue-100 p-6 rounded-full">
                                    <Award className="h-12 w-12 text-blue-600" />
                                </div>
                            </div>
                            
                            <h2 className="text-xl font-medium mb-2">You don't have any certificates yet</h2>
                            <p className="text-muted-foreground mb-6">
                                Get your certificate with these courses
                            </p>

                            {/* Suggested Courses */}
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
                                            <Link to={`/courses/${course.id}`}>
                                                Start Course <ArrowRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {/* Browse All Courses Button */}
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
                                    <div key={cert.id} className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="p-6 border-b">
                                            <div className="flex justify-between items-start mb-4">
                                                <Award className="h-10 w-10 text-yellow-500" />
                                                <span className="text-sm text-muted-foreground">{cert.date}</span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-1">{cert.course}</h3>
                                            <p className="text-sm text-muted-foreground">Score: {cert.score}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50">
                                            <Button variant="outline" className="w-full" asChild>
                                                <a href={cert.downloadUrl} download>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download PDF
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Suggested Courses Section */}
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
                                                <Link to={`/courses/${course.id}`}>
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