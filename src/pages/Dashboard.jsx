import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { BookOpen, Award, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const UserDashboard = () => {
    const { userId } = useParams(); // Get userId from URL params
    const [userData, setUserData] = useState({
        name: "",
        stats: {
            tutorialsCompleted: 0,
            lessonsCompleted: 0
        }, 
        recentCourses: []
    });
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Make sure this matches your MirageJS route exactly
                const response = await fetch(`http://localhost:5000/api/user/dashboard/${userId || '68152e9b92f42938445d56d0'}`);

                if (!response.ok) {
                    console.log(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setUserData(data.data);
                } else {
                    toast({
                        title: "Error loading dashboard",
                        description: data.errorMessage,
                        variant: "destructive",
                    });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast({
                    title: "Network error",
                    description: error.message, // Show actual error message
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [userId, toast]);

    if (loading) {
        return (
            <Layout>
                <div className="container py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Hello, {userData.name.split(' ')[0]}
                    </h1>
                    <p className="text-muted-foreground">Your learning journey at a glance</p>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Certificates</p>
                                <p className="text-xl font-bold">{userData.stats.tutorialsCompleted}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Award className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Lessons</p>
                                <p className="text-xl font-bold">{userData.stats.lessonsCompleted}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Continue Learning Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Continue learning</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.recentCourses.map((course) => (
                            <div key={course.id} className="bg-white rounded-lg border overflow-hidden shadow-sm">
                                <div className="flex">
                                    <div className="w-1/3 bg-gray-100">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-2/3 p-4">
                                        <h3 className="font-bold mb-2">{course.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                            <Clock className="h-4 w-4" />
                                            <span>{course.progress}/{course.total} lessons</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${(course.progress / course.total) * 100}%` }}
                                            ></div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-4 w-full flex items-center justify-between"
                                            asChild
                                        >
                                            <Link to={`/courses/${course.slug}`}>
                                                Continue
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;