import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Award, ChevronLeft, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import selectAuthUser from "@/features/auth/selectors/user";






const CertificationTest = ({ courseTitle }) => {
    const { slug } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectAuthUser);
    const handleQuizCompletion = async () => { // Mark the function as async
        const passed = score >= Math.floor(quizQuestions.length * 0.7);

        // 🆕 Save certificate if passed
        if (passed && currentUser && course) {
            await fetch('http://localhost:5000/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: currentUser.id,
                    courseId: course.id,
                    date: new Date().toISOString(),
                    issuer: "DIGILEARN Academy"
                })
            });
        }

        // 🔁 Navigate to results
        navigate(`/courses/${slug}/certification/results`, {
            state: {
                passed,
                score,
                totalQuestions: quizQuestions.length,
                userData: {
                    name: currentUser?.firstName || "Yassine EL AOUNI",
                    skill: course?.title || "Marketing with Canva",
                    date: new Date().toLocaleDateString(),
                    issuer: "DIGILEARN Academy",
                    title: "Course Instructor"
                }
            },
            replace: true
        });

        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <p>Generating your certificate...</p>
                </div>
            </Layout>
        );
}; 

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${slug}`);
                const courseData = await response.json();

                if (courseData.success) {
                    setCourse(courseData.course);

                    const quizResponse = await fetch(`http://localhost:5000/api/courses/68152e9b92f42938445d56d2/quiz`);
                    const quizData = await quizResponse.json();
                    console.log(quizData); 

                    if (quizData.success && quizData.questions?.length > 0) {
                        setQuizQuestions(quizData.questions); // ✅ correct
                    }

                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizData();
    }, [slug]);


    if (isLoading) {
        return (
            <Layout>
                <div className="container py-8 text-center">Loading quiz data...</div>
            </Layout>
        );
    }


    if (!course) {
        return (
            <Layout>
                <div className="container py-8 text-center">Course not found</div>
            </Layout>
        );
    }

    if (quizQuestions.length === 0) {
        return (
            <Layout>
                <div className="container py-8 text-center">No quiz questions available</div>
            </Layout>
        );
    }


    const handleOptionSelect = (optionIndex) => {
        if (isAnswered) return;
        setSelectedOption(optionIndex);
        setIsAnswered(true);

        if (optionIndex === quizQuestions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setQuizCompleted(false);
        setTestStarted(false);
    };

    const startTest = () => {
        setTestStarted(true);
    };

    if (!testStarted) {
        return (
            <Layout>
                <div className="container py-8 md:py-12">
                    <Link
                        to={`/courses/${slug}`}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Course
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center bg-white rounded-xl border border-gray-100 shadow-sm p-8"
                    >
                        <Award className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                        <h1 className="text-3xl font-bold mb-4">Certification Test</h1>
                        <h2 className="text-2xl text-muted-foreground mb-6">Marketing with Canva</h2>

                        <p className="text-lg mb-8">
                            Test your skills and earn a Canva certification in this {quizQuestions.length}-question test.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="font-medium">{quizQuestions.length} questions</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="font-medium flex items-center justify-center gap-1">
                                    <Clock className="h-4 w-4" /> 20 minutes
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="font-medium">Certificate of completion</div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 px-8"
                            onClick={startTest}
                        >
                            Start Test
                        </Button>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    if (quizCompleted) {
       handleQuizCompletion(); // Call the function to handle quiz completion
    }



    return (
        <Layout>
            <div className="container py-8 md:py-12">
                <Link
                    to={`/courses/${slug}`}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Course
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">Marketing with Canva</h2>
                        <span className="text-sm text-muted-foreground">
                            {currentQuestion + 1} of {quizQuestions.length}
                        </span>
                    </div>

                    <h2 className="text-xl font-bold mb-6">
                        {quizQuestions[currentQuestion].question}
                    </h2>

                    <div className="space-y-3 mb-6">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                                className={cn(
                                    "p-4 border rounded-lg cursor-pointer transition-colors",
                                    isAnswered && index === quizQuestions[currentQuestion].correctAnswer
                                        ? 'border-green-500 bg-green-50'
                                        : isAnswered && selectedOption === index
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200 hover:bg-gray-50'
                                )}
                                onClick={() => handleOptionSelect(index)}
                            >
                                {option}
                            </motion.div>
                        ))}
                    </div>

                    {isAnswered && (
                        <div className={cn(
                            "p-4 rounded-lg mb-6",
                            selectedOption === quizQuestions[currentQuestion].correctAnswer
                                ? 'bg-green-50 text-green-800'
                                : 'bg-red-50 text-red-800'
                        )}>
                            {quizQuestions[currentQuestion].feedback}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Button
                            onClick={handleNextQuestion}
                            disabled={!isAnswered}
                            className="bg-gradient-to-r from-purple-600 to-blue-500"
                        >
                            {currentQuestion === quizQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default CertificationTest;