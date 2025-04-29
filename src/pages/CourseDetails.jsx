import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Play, MessageSquareWarning, Clock, BarChart, Check, ChevronDown, ChevronUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CourseDetails = () => {
  const { slug } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState({});
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState([]);

  // Fetch both course data and user progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch course data
        const courseResponse = await fetch(`/api/courses/${slug}`);
        const courseData = await courseResponse.json();

        if (!courseData.success) {
          throw new Error(courseData.errorMessage || 'Course not found');
        }

        // Fetch user progress - using a mock userId for now
        const userId = '1'; // Replace with actual user ID from auth context
        const progressResponse = await fetch(`/api/user/progress?userId=${userId}`);
        const progressData = await progressResponse.json();

        setCourse(courseData.course);
        setUserProgress(progressData.success ? progressData.progress : []);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const markLessonComplete = async (lessonId) => {
    try {
      const userId = '1';

      // Optimistic update
      setUserProgress(prev => {
        // Check if already completed
        if (prev.some(p => p.lessonId === lessonId && p.completed)) {
          return prev;
        }

        // Add new progress record
        return [...prev, {
          lessonId,
          completed: true,
          // Add temporary flag for optimistic update
          _optimistic: true
        }];
      });

      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, lessonId })
      });

      const data = await response.json();

      if (data.success) {
        // Replace optimistic record with server response
        setUserProgress(prev => [
          ...prev.filter(p => !(p.lessonId === lessonId && p._optimistic)),
          { lessonId, completed: true }
        ]);
      } else {
        // Revert on failure
        setUserProgress(prev => prev.filter(p => p.lessonId !== lessonId));
        console.error('Failed to mark complete:', data.error);
      }
    } catch (error) {
      setUserProgress(prev => prev.filter(p => p.lessonId !== lessonId));
      console.error('Error marking lesson complete:', error);
    }
  };

  // Enhanced completion check
  const isLessonCompleted = (lessonId) => {
    return userProgress.some(p => p.lessonId === lessonId && p.completed);
  };

  // Debug effect
  useEffect(() => {
    console.log('Current progress:', userProgress);
  }, [userProgress]);

  const toggleLesson = (lessonId) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const handleVideoOpen = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);
    setCurrentVideo(null);
  };


  if (loading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p>Loading course details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="max-w-md mx-auto">
            <MessageSquareWarning className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">{error || 'Course not found'}</h1>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container py-8 md:py-12">
          <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {course.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-medium">{course.rating}</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <BarChart className="h-4 w-4" />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-80 lg:h-auto shadow-md">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container">
          {/* What You'll Learn Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">What You'll Learn</h2>
            <div className="space-y-3">
              {course.learningOutcomes?.map((outcome, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Course Content</h2>
            </div>

            {course.modules?.map((module) => (
              <div key={module.id} className="border-b last:border-b-0">
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-4">{module.title}</h3>
                  <div className="space-y-3">
                    {course.modules?.map((module) => (
                      <div key={module.id} className="border-b last:border-b-0">
                        <div className="p-6">
                          <div className="space-y-3">
                            {module.lessons?.map((lesson) => {
                              const completed = isLessonCompleted(lesson.id);

                              return (
                                <div key={lesson.id} className="rounded-lg overflow-hidden border border-gray-200">
                                  {/* Lesson Header */}
                                  <div
                                    className={`flex items-center justify-between p-4 ${completed ? 'bg-green-50' : 'bg-gray-50'
                                      } hover:bg-gray-100 cursor-pointer transition-colors`}
                                    onClick={() => toggleLesson(lesson.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      {completed ? (
                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                      ) : (
                                        <Play className="h-4 w-4 text-purple-600 flex-shrink-0" />
                                      )}
                                      <div>
                                        <h4 className="font-medium">{lesson.title}</h4>
                                        {lesson.duration && (
                                          <span className="text-xs text-muted-foreground">
                                            {lesson.duration}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {expandedLessons[lesson.id] ? (
                                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </div>

                                  {/* Lesson Content */}
                                  {expandedLessons[lesson.id] && (
                                    <div className="p-4 bg-white">
                                      {lesson.description && (
                                        <p className="text-muted-foreground mb-4">
                                          {lesson.description}
                                        </p>
                                      )}
                                      <div className="flex gap-2">
                                        <Button
                                          variant="outline"
                                          onClick={() => handleVideoOpen(lesson.videoUrl)}
                                        >
                                          <Play className="h-4 w-4 mr-2" />
                                          Watch Video
                                        </Button>
                                        {!completed && (
                                          <Button
                                            variant="default"
                                            onClick={() => markLessonComplete(lesson.id)}
                                          >
                                            Mark as Complete
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Certification Test
              </h2>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Make it official</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Take this 20-question test and earn a certification - perfect for your CV and LinkedIn.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500"
              >
                <Link to={`/courses/${slug}/certification`}>
                  Earn a certificate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        open={isVideoOpen}
        onClose={handleVideoClose}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '80%',
            height: '80%',
            backgroundColor: '#000',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <IconButton
            onClick={handleVideoClose}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          {currentVideo && (
            <iframe
              width="100%"
              height="100%"
              src={currentVideo.includes('embed') ? currentVideo : `https://www.youtube.com/embed/${currentVideo.split('v=')[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
          )}
        </div>
      </Modal>
    </Layout>
  );
};

export default CourseDetails;