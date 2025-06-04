import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { BookOpen, Award, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const UserDashboard = () => {
    const userId = "6838d919cbd10b318d935b58";
    const [userData, setUserData] = useState({
        name: "",
        stats: {
            certificates: 0,
            lessonsCompleted: 0,
            completedCourses: 0,
            totalCourses: 0
        },
        allCourses: []
    });
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/dashboard/${userId}`);
                const data = await response.json();

                if (data.success) {
                    setUserData(data.data);
                } else {
                    toast({
                        title: "Erreur lors de la récupération du tableau de bord",
                        description: data.errorMessage,
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "Erreur de réseau",
                    description: error.message,
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
                        Bonjour, {userData.name.split(' ')[0]}
                    </h1>
                    <p className="text-muted-foreground">Votre parcours d'apprentissage en un coup d'œil</p>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Certificats</p>
                                <p className="text-xl font-bold">{userData.stats.certificates}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Award className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Leçons</p>
                                <p className="text-xl font-bold">{userData.stats.lessonsCompleted}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Cours Terminés</p>
                                <p className="text-xl font-bold">{userData.stats.completedCourses}/{userData.stats.totalCourses}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Vos Cours</h2>

                    {userData.allCourses.length === 0 ? (
                        <div className="bg-white rounded-lg border p-8 text-center">
                            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Aucun cours actif trouvé</h3>
                            <p className="text-muted-foreground mb-4">
                                Vous n'avez pas encore commencé de cours ou tous les cours sont vides.
                            </p>
                            <Button asChild>
                                <Link to="/courses">Parcourir les Cours</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userData.allCourses.map((course) => {
                                // Calculate progress percentage safely
                                const progressPercent = course.total > 0
                                    ? Math.round((course.progress / course.total) * 100)
                                    : 0;

                                return (
                                    <div key={course.id} className={`bg-white rounded-lg border overflow-hidden shadow-sm ${course.isCompleted ? 'border-green-200' : ''}`}>
                                        <div className="flex">
                                            <div className="w-1/3 bg-gray-100 relative">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                {course.isCompleted && (
                                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Terminé
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-2/3 p-4">
                                                <h3 className="font-bold mb-2">{course.title}</h3>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{course.progress}/{course.total} leçons ({progressPercent}%)</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${course.isCompleted ? 'bg-green-500' : 'bg-blue-600'}`}
                                                        style={{ width: `${progressPercent}%` }}
                                                    ></div>
                                                </div>
                                                <Button
                                                    variant={course.isCompleted ? "secondary" : "outline"}
                                                    size="sm"
                                                    className="mt-4 w-full flex items-center justify-between"
                                                    asChild
                                                >
                                                    <Link to={`/courses/${course.slug}`}>
                                                        {course.isCompleted ? 'Voir le Cours' : 'Continuer'}
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;