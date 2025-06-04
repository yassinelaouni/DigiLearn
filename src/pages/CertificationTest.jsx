import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Award, ChevronLeft, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import selectAuthUser from "@/features/auth/selectors/user";

const CertificationTest = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    // const currentUser = useSelector(selectAuthUser);
    const currentUser = { id: "68152e9b92f42938445d56d0", firstName: "Yassine" };

    const [quizState, setQuizState] = useState({
        currentQuestion: 0,
        selectedOption: null,
        isAnswered: false,
        score: 0,
        quizCompleted: false,
        testStarted: false
    });
    const [quizData, setQuizData] = useState({
        questions: [],
        course: null,
        isLoading: true
    });

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                // Fetch course data
                const courseRes = await fetch(`http://localhost:5000/api/courses/${slug}`);
                const courseData = await courseRes.json();

                if (!courseData.success) throw new Error("Course not found");

                // Fetch quiz questions
                const quizRes = await fetch(`http://localhost:5000/api/quizzes/courses/${courseData.course._id}/quiz`);
                const quizData = await quizRes.json();

                setQuizData({
                    questions: quizData.success ? quizData.quiz.questions : [],
                    course: courseData.course,
                    isLoading: false
                });
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setQuizData(prev => ({ ...prev, isLoading: false }));
            }
        };

        fetchQuizData();
    }, [slug]);

    const handleQuizCompletion = async () => {
        const passed = quizState.score >= Math.floor(quizData.questions.length * 0.7);

        if (passed && currentUser && quizData.course) {
            console.log("currentUser :", currentUser)
            try {
                await fetch('http://localhost:5000/api/certificates/issue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: currentUser.id,
                        courseId: quizData.course._id,
                        score: quizState.score
                    })
                });
            } catch (error) {
                console.error("Failed to issue certificate:", error);
            }
        }

        navigate(`/courses/${slug}/certification/results`, {
            state: {
                passed,
                score: quizState.score,
                totalQuestions: quizData.questions.length,
                courseTitle: quizData.course?.title || "Course",
                userName: currentUser?.firstName || "User"
            }
        });
    };

    const handleOptionSelect = (optionIndex) => {
        if (quizState.isAnswered) return;

        const isCorrect = optionIndex === quizData.questions[quizState.currentQuestion].correctAnswer;

        setQuizState(prev => ({
            ...prev,
            selectedOption: optionIndex,
            isAnswered: true,
            score: isCorrect ? prev.score + 1 : prev.score
        }));
    };

    const handleNextQuestion = () => {
        if (quizState.currentQuestion < quizData.questions.length - 1) {
            setQuizState(prev => ({
                ...prev,
                currentQuestion: prev.currentQuestion + 1,
                selectedOption: null,
                isAnswered: false
            }));
        } else {
            setQuizState(prev => ({ ...prev, quizCompleted: true }));
        }
    };

    const startTest = () => {
        setQuizState(prev => ({ ...prev, testStarted: true }));
    };

    if (quizData.isLoading) {
        return (
            <Layout>
                <div className="container py-8 text-center">Chargement des données du quiz...</div>
            </Layout>
        );
    }

    if (!quizData.course) {
        return (
            <Layout>
                <div className="container py-8 text-center">Cours introuvable</div>
            </Layout>
        );
    }

    if (quizData.questions.length === 0) {
        return (
            <Layout>
                <div className="container py-8 text-center">Aucune question de quiz disponible</div>
            </Layout>
        );
    }

    if (quizState.quizCompleted) {
        handleQuizCompletion();
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <p>Génération de votre certificat...</p>
                </div>
            </Layout>
        );
    }

    if (!quizState.testStarted) {
        return (
            <Layout>
                <div className="container py-8 md:py-12">
                    <Link to={`/courses/${slug}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Retour au cours
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center bg-white rounded-xl border border-gray-100 shadow-sm p-8"
                    >
                        <Award className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                        <h1 className="text-3xl font-bold mb-4">Test de certification</h1>
                        <h2 className="text-2xl text-muted-foreground mb-6">{quizData.course.title}</h2>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-blue-500 px-8"
                            onClick={startTest}
                        >
                            Commencer le test
                        </Button>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    const currentQ = quizData.questions[quizState.currentQuestion];

    return (
        <Layout>
            <div className="container py-8 md:py-12">
                <Link to={`/courses/${slug}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Retour au cours
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">{quizData.course.title}</h2>
                        <span className="text-sm text-muted-foreground">
                            {quizState.currentQuestion + 1} sur {quizData.questions.length}
                        </span>
                    </div>

                    <h2 className="text-xl font-bold mb-6">{currentQ.question}</h2>

                    <div className="space-y-3 mb-6">
                        {currentQ.options.map((option, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: !quizState.isAnswered ? 1.02 : 1 }}
                                className={cn(
                                    "p-4 border rounded-lg cursor-pointer transition-colors",
                                    quizState.isAnswered && index === currentQ.correctAnswer
                                        ? 'border-green-500 bg-green-50'
                                        : quizState.isAnswered && quizState.selectedOption === index
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                )}
                                onClick={() => handleOptionSelect(index)}
                            >
                                {option}
                            </motion.div>
                        ))}
                    </div>

                    {quizState.isAnswered && (
                        <div className={cn(
                            "p-4 rounded-lg mb-6",
                            quizState.selectedOption === currentQ.correctAnswer
                                ? 'bg-green-50 text-green-800'
                                : 'bg-red-50 text-red-800'
                        )}>
                            {currentQ.feedback}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Button
                            onClick={handleNextQuestion}
                            disabled={!quizState.isAnswered}
                            className="bg-gradient-to-r from-purple-600 to-blue-500"
                        >
                            {quizState.currentQuestion === quizData.questions.length - 1
                                ? 'Terminer le test'
                                : 'Question suivante'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default CertificationTest;