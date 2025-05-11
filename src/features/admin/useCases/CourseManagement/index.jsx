import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Search, Edit, Plus, Trash2, FileText, Upload, CheckCircle, XCircle, PlayCircle, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog" // Adjust the import path based on your project
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const AdminCourses = () => {
  const { toast } = useToast();
  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Digital Marketing'
  ];

  const lessonTypes = ['video', 'reading'];
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(initCourse());
  const [currentLesson, setCurrentLesson] = useState(initLesson());
  const [openQuizDialog, setOpenQuizDialog] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(initQuiz());
  const [quizzes, setQuizzes] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();

        if (data.success && data.courses) {
          const transformedCourses = data.courses.map(course => {
            // Flatten modules into lessons while preserving module context
            const lessons = course.modules?.reduce((acc, module) => {
              const moduleLessons = module.lessons?.map(lesson => ({
                ...lesson,
                moduleId: module._id,
                moduleTitle: module.title,
                moduleOrder: module.order
              })) || [];
              return [...acc, ...moduleLessons];
            }, []) || [];

            return {
              id: course._id,
              title: course.title,
              description: course.description,
              thumbnail: course.thumbnail,
              lessons, // This now contains all lessons from all modules
              modules: course.modules || [],
              quiz: course.quiz || null,
              // Include other course properties as needed
              ...course
            };
          });

          setCourses(transformedCourses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        toast({
          title: 'Error',
          description: 'Failed to load courses',
          variant: 'destructive'
        });
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  function initCourse() {
    return {
      id: '',
      title: '',
      description: '',
      category: '',
      duration: '',
      level: 'Beginner',
      thumbnail: '',
      learningOutcomes: [],
      lessons: [],
      quiz: null
    };
  }

  function initLesson() {
    return {
      id: '',
      title: '',
      type: 'video',
      duration: '',
      videoUrl: '',
      readingContent: '',
      pdfUrl: '',
      description: '',
      courseId: ''
    };
  }

  function initQuiz() {
    return {
      id: '',
      courseId: '',
      title: 'Quiz for [Course Name]',
      description: 'Test your knowledge',
      questions: [
        {
          id: Date.now().toString(),
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          feedback: ''
        }
      ]
    };
  }

  const fetchQuizDetails = async (courseId, quizId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/quizzes/${quizId}/details`);
      const data = await response.json();

      if (data.success) {
        setQuizzes(prev => ({
          ...prev,
          [courseId]: data.quiz
        }));
      }
    } catch (error) {
      console.error('Error fetching quiz details:', error);
    }
  };

  useEffect(() => {
    courses.forEach(course => {
      if (course.quiz) {
        fetchQuizDetails(course.id, course.quiz._id);
      }
    });
  }, [courses]);

  const handleSaveLesson = async () => {
    try {
      const url = currentLesson._id
        ? `http://localhost:5000/api/courses/${currentCourse.id}/lessons/${currentLesson._id}`
        : `http://localhost:5000/api/courses/${currentCourse.id}/lessons`;

      const method = currentLesson._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...currentLesson,
          moduleId: currentLesson.moduleId || null
        }),
      });

      if (response.ok) {
        // Refresh course data
        fetchCourses();
        setOpenLessonDialog(false);
        toast({
          title: 'Success',
          description: `Lesson ${currentLesson._id ? 'updated' : 'created'} successfully`,
        });
      } else {
        throw new Error('Failed to save lesson');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // In your AdminCourses component
  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${questionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete question');

      // Refresh quiz data
      const course = courses.find(c => c.quiz && quizzes[c.id]?.questions.some(q => q.id === questionId));
      if (course) {
        fetchQuizDetails(course.id, course.quiz._id);
      }

      toast({ title: 'Success', description: 'Question deleted' });
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate at least one question with all fields filled
      const validQuestions = currentQuiz.questions.filter(q =>
        q.question.trim() !== '' &&
        q.options.every(opt => opt.trim() !== '') &&
        q.options.length === 4
      );

      if (validQuestions.length === 0) {
        throw new Error('Please add at least one valid question with all options filled');
      }

      const url = currentQuiz.id
        ? `http://localhost:5000/api/quizzes/${currentQuiz.id}`
        : 'http://localhost:5000/api/quizzes';

      const method = currentQuiz.id ? 'PUT' : 'POST';

      const payload = {
        courseId: currentQuiz.courseId,
        title: currentQuiz.title,
        description: currentQuiz.description,
        questions: validQuestions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          feedback: q.feedback || ''
        }))
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save quiz');
      }

      // Update local state
      setCourses(courses.map(c =>
        c.id === currentQuiz.courseId ? { ...c, quiz: data.quiz } : c
      ));

      // Refresh quiz details
      if (data.quiz._id) {
        await fetchQuizDetails(currentQuiz.courseId, data.quiz._id);
      }

      setOpenQuizDialog(false);
      toast({
        title: 'Success',
        description: `Quiz ${currentQuiz.id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setCurrentLesson(prev => ({ ...prev, pdfUrl: data.url }));
        toast({
          title: 'Success',
          description: 'File uploaded successfully'
        });
      } else {
        throw new Error(data.errorMessage || 'Upload failed');
      }
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !currentCourse.title ||
      !currentCourse.description ||
      !currentCourse.category ||
      !currentCourse.thumbnail ||
      !currentCourse.duration ||
      !currentCourse.level
    ) {
      toast({
        title: 'Error',
        description: 'Required fields are missing',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const method = currentCourse.id ? 'PUT' : 'POST';
      const url = currentCourse.id
        ? `http://localhost:5000/api/courses/${currentCourse.id}`
        : 'http://localhost:5000/api/courses';

      // Create a clean payload without undefined values
      const payload = {
        title: currentCourse.title,
        description: currentCourse.description,
        category: currentCourse.category,
        slug: currentCourse.title.toLowerCase().replace(/\s+/g, '-'),
        thumbnail: currentCourse.thumbnail,
        duration: currentCourse.duration,
        level: currentCourse.level,
        learningOutcomes: currentCourse.learningOutcomes,
        lessons: currentCourse.lessons,
        quiz: currentCourse.quiz
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || 'Operation failed');
      }

      const data = await response.json();

      if (currentCourse.id) {
        setCourses(courses.map(c => c.id === currentCourse.id ? data.course : c));
      } else {
        setCourses([...courses, data.course]);
      }

      setOpenCourseDialog(false);
      resetCourseForm();
      toast({
        title: 'Success',
        description: `Course ${currentCourse.id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLesson = async (e) => {
    e.preventDefault();

    // Add validation
    if (!currentLesson.title || !currentLesson.duration ||
      (currentLesson.type === 'video' && !currentLesson.videoUrl) ||
      (currentLesson.type === 'reading' && !currentLesson.readingContent)) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const method = currentLesson.id ? 'PUT' : 'POST';
      const url = currentLesson.id
        ? `http://localhost:5000/api/lessons/${currentLesson.id}`
        : 'http://localhost:5000/api/lessons';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentLesson)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.errorMessage || 'Operation failed');
      }

      // Update the course with the new/updated lesson
      const updatedCourses = courses.map(course => {
        if (course.id === currentLesson.courseId) {
          if (currentLesson.id) {
            // Update existing lesson
            const updatedLessons = course.lessons.map(l =>
              l.id === currentLesson.id ? data.lesson : l
            );
            return { ...course, lessons: updatedLessons };
          } else {
            // Add new lesson
            return { ...course, lessons: [...course.lessons, data.lesson] };
          }
        }
        return course;
      });

      setCourses(updatedCourses);
      setOpenLessonDialog(false);
      resetLessonForm();
      toast({
        title: 'Success',
        description: `Lesson ${currentLesson.id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };



  const handleEditCourse = (course) => {
    setCurrentCourse({ ...course });
    setOpenCourseDialog(true);
  };

  const handleEditLesson = (courseId, lesson) => {
    setCurrentLesson({ ...lesson, courseId });
    setOpenLessonDialog(true);
  };



  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setCourses(courses.filter(c => c.id !== courseId));
      toast({
        title: 'Success',
        description: 'Course deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleDeleteLesson = async (courseId, lessonId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }

      setCourses(courses.map(c =>
        c.id === courseId
          ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) }
          : c
      ));
      toast({
        title: 'Success',
        description: 'Lesson deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleCreateQuiz = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    console.log("click on create quiz", courseId, course)
    if (!course) return;

    setCurrentQuiz({
      ...initQuiz(),
      courseId,
      title: `Quiz for ${course.title}`
    });
    setOpenQuizDialog(true);
  };

  const handleEditQuiz = (courseId, quiz) => {
    setCurrentQuiz({
      ...quiz,
      courseId
    });
    setOpenQuizDialog(true);
  };

  const handleDeleteQuiz = async (courseId) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course?.quiz) return;

      await fetch(`http://localhost:5000/api/quizzes/${course.quiz._id}`, {
        method: 'DELETE'
      });

      setCourses(courses.map(c =>
        c.id === courseId ? { ...c, quiz: null } : c
      ));

      toast({
        title: 'Success',
        description: 'Quiz deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const resetCourseForm = () => setCurrentCourse(initCourse());
  const resetLessonForm = () => setCurrentLesson(initLesson());

  const addQuestion = () => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: [
        ...currentQuiz.questions,
        {
          id: Date.now().toString(),
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          feedback: ''
        }
      ]
    });
  };

  const removeQuestion = (questionId) => {
    if (currentQuiz.questions.length <= 1) {
      toast({
        title: 'Warning',
        description: 'A quiz must have at least one question',
        variant: 'default'
      });
      return;
    }

    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions.filter(q => q.id !== questionId)
    });
  };

  const updateQuestion = (questionId, field, value) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    });
  };

  const updateOption = (questionId, optionIndex, value) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions.map(q => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    });
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Dialog open={openQuizDialog} onOpenChange={setOpenQuizDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentQuiz.id ? 'Edit Quiz' : 'Create Quiz'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitQuiz} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={currentQuiz.title}
                  onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={currentQuiz.description}
                  onChange={(e) => setCurrentQuiz({ ...currentQuiz, description: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Questions</h4>
                {currentQuiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4 space-y-3">
                    <div className="space-y-2">
                      <Label>Question {qIndex + 1}</Label>
                      <Input
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Options</Label>
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === oIndex}
                            onChange={() => updateQuestion(question.id, 'correctAnswer', oIndex)}
                          />
                          <Input
                            value={option}
                            onChange={(e) => updateOption(question.id, oIndex, e.target.value)}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>Feedback</Label>
                      <Input
                        value={question.feedback}
                        onChange={(e) => updateQuestion(question.id, 'feedback', e.target.value)}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                      disabled={currentQuiz.questions.length <= 1}
                    >
                      Remove Question
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addQuestion}
                >
                  Add Question
                </Button>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">↻</span>
                      {currentQuiz.id ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    currentQuiz.id ? 'Update Quiz' : 'Create Quiz'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && !courses.length ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {(courses || []).map(course => (
            <div key={course.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{course.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {course.category} • {course.duration} • {course.level}
                  </p>
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="mt-2 h-32 object-cover rounded"
                    />
                  )}
                  <p className="mt-2">{course.description}</p>

                  {course.learningOutcomes?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Learning Outcomes:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {course.learningOutcomes.map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                    Delete
                  </Button>
                </div>
              </div>

              {/* Simplified Quiz Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Quiz</h3>
                  {course.quiz ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditQuiz(course.id, course.quiz)}
                        variant="outline"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Quiz
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteQuiz(course.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Quiz
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleCreateQuiz(course.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Quiz
                    </Button>
                  )}
                </div>

                {course.quiz ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-96 overflow-y-auto p-4">
                      {quizzes[course.id]?.questions?.length > 0 ? (
                        quizzes[course.id].questions.map((question, index) => (
                          <div key={question.id} className="mb-4 pb-4 border-b last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div className="w-full">
                                <p className="font-medium">{index + 1}. {question.question}</p>
                                <div className="mt-2 space-y-1">
                                  {question.options.map((option, i) => (
                                    <div
                                      key={i}
                                      className={`flex items-center ${i === question.correctAnswer ? 'text-green-600 font-medium' : ''}`}
                                    >
                                      {i === question.correctAnswer ? (
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                      ) : (
                                        <Circle className="h-4 w-4 mr-2" />
                                      )}
                                      <span className="truncate">{option}</span>
                                    </div>
                                  ))}
                                </div>
                                {question.feedback && (
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    <span className="font-medium">Feedback:</span> {question.feedback}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="ml-4 flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No questions added yet
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground mb-4">No quiz created yet</p>
                  </div>
                )}
              </div>

              {/* Lessons Section (unchanged from your original) */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Lessons</h3>
                <Dialog open={openLessonDialog} onOpenChange={setOpenLessonDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        resetLessonForm();
                        setCurrentLesson({ ...initLesson(), courseId: course.id });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lesson
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => {
                      if (!loading) {
                        setOpenLessonDialog(false);
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle id="lesson-dialog-title">
                        {currentLesson.id ? 'Edit Lesson' : 'Add Lesson'}
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleSubmitLesson}
                      className="space-y-4"
                      aria-labelledby="lesson-dialog-title"
                    >
                      {/* ... rest of your lesson form ... */}
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course?.lessons?.length > 0 ? (
                    course.lessons.map((lesson) => (
                      <TableRow key={lesson._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {lesson.type === 'video' && <PlayCircle className="h-4 w-4" />}
                            {lesson.type === 'reading' && <FileText className="h-4 w-4" />}
                            {lesson.title}
                          </div>
                          {lesson.description && (
                            <p className="text-sm text-muted-foreground">
                              {lesson.description}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          {lesson.moduleTitle || 'Unassigned'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {lesson.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {lesson.duration ? `${lesson.duration}` : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditLesson(lesson)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteLesson(lesson._id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No lessons found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      )
      }



    </div >
  );
};

export default AdminCourses;