import { useState } from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
    BookOpen,
    FileText,
    Award,
    Clock,
    ChevronRight,
    Play
} from "lucide-react";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
    // Sample data - replace with actual user data
    const [userData, setUserData] = useState({
        name: "Yassine",
        stats: {
            tutorialsCompleted: 2,
            quizzesTaken: 2,
            lessonsCompleted: 9
        },
        recentCourses: [
            {
                title: "Windows Basics",
                progress: 3,
                total: 16,
                thumbnail: "/windows-thumbnail.jpg"
            },
            {
                title: "Word",
                progress: 6,
                total: 36,
                thumbnail: "/word-thumbnail.jpg"
            }
        ]
    });

    return (
        <Layout>
            <div className="container py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Hello, {userData.name}
                    </h1>
                    <p className="text-muted-foreground">Your learning journey at a glance</p>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tutorials</p>
                                <p className="text-xl font-bold">{userData.stats.tutorialsCompleted}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Quizzes</p>
                                <p className="text-xl font-bold">{userData.stats.quizzesTaken}</p>
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
                        <Link to="/courses" className="text-sm text-blue-600 hover:underline">
                            View all
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.recentCourses.map((course, index) => (
                            <div key={index} className="bg-white rounded-lg border overflow-hidden shadow-sm">
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
                                            <Link to={`/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`}>
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

                {/* Quick Actions */}
                <div className="bg-white rounded-lg border p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Quick actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                            <Play className="h-6 w-6" />
                            <span>Resume last lesson</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                            <FileText className="h-6 w-6" />
                            <span>Take a quiz</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;