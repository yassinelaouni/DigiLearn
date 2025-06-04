import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Search, Edit, Plus, Trash2, FileText, Upload, CheckCircle, XCircle, PlayCircle, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
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
    'Développement Web',
    'Développement Mobile',
    'Science des Données',
    'Apprentissage Automatique',
    'Marketing Numérique'
  ];

  const lessonTypes = ['vidéo', 'lecture'];
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
          title: 'Erreur',
          description: 'Impossible de charger les cours',
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
      type: 'vidéo', // Default to video
      duration: '',
      videoUrl: '', // Initialize video URL
      readingContent: '', // Initialize reading content
      pdfUrl: '',
      description: '',
      courseId: '',
      moduleId: ''
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
          id: `temp-${Math.random().toString(36).substr(2, 9)}`, // Generate a temporary ID
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
          title: 'Succès',
          description: `Leçon ${currentLesson._id ? 'mise à jour' : 'créée'} avec succès`,
        });
      } else {
        throw new Error('Failed to save lesson');
      }
    } catch (error) {
      toast({
        title: 'Erreur',
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

      toast({ title: 'Succès', description: 'Question supprimée' });
    } catch (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    }
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate questions
      const validQuestions = currentQuiz.questions.filter(q =>
        q.question.trim() !== '' &&
        q.options.every(opt => opt.trim() !== '') &&
        q.options.length === 4
      );

      if (validQuestions.length === 0) {
        throw new Error('Please add at least one valid question');
      }

      const method = currentQuiz._id ? 'PUT' : 'POST';
      const url = currentQuiz._id
        ? `http://localhost:5000/api/quizzes/${currentQuiz._id}`
        : 'http://localhost:5000/api/quizzes';

      // Filter out temporary IDs (start with 'temp-')
      const payload = {
        title: currentQuiz.title,
        description: currentQuiz.description,
        courseId: currentQuiz.courseId,
        questions: validQuestions.map(q => ({
          // Only send ID if it's a real MongoDB ID (24 chars hex)
          id: q.id.startsWith('temp-') ? undefined : q.id,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          feedback: q.feedback || ''
        }))
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save quiz');
      }

      // Update local state
      setCourses(prevCourses =>
        prevCourses.map(c =>
          c._id === currentQuiz.courseId ? { ...c, quiz: data.quiz } : c
        )
      );

      setOpenQuizDialog(false);
      toast({
        title: 'Succès',
        description: `Quiz ${currentQuiz._id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setCurrentLesson(prev => ({
        ...prev,
        pdfUrl: response.data.url
      }));

      toast({
        title: 'Succès',
        description: 'PDF uploaded successfully'
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.errorMessage || 'Failed to upload PDF',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
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
        title: 'Erreur',
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

      // Process learning outcomes - ensure it's an array and filter empty lines
      const learningOutcomes = Array.isArray(currentCourse.learningOutcomes)
        ? currentCourse.learningOutcomes
          .map(item => item.trim())
          .filter(item => item !== '')
        : [];


      // Create a clean payload without undefined values
      const payload = {
        title: currentCourse.title,
        description: currentCourse.description,
        category: currentCourse.category,
        slug: currentCourse.title.toLowerCase().replace(/\s+/g, '-'),
        thumbnail: currentCourse.thumbnail,
        duration: currentCourse.duration,
        level: currentCourse.level,
        learningOutcomes,
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
        title: 'Succès',
        description: `Course ${currentCourse.id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Type-specific validation
    if (currentLesson.type === 'vidéo' && !currentLesson.videoUrl) {
      toast({
        title: 'Erreur',
        description: 'Video URL is required for video lessons',
        variant: 'destructive'
      });
      return;
    }

    if (currentLesson.type === 'lecture' && !currentLesson.readingContent) {
      toast({
        title: 'Erreur',
        description: 'Reading content is required for reading lessons',
        variant: 'destructive'
      });
      return;
    }

    try {
      const courseId = currentLesson.courseId || currentCourse.id;
      if (!courseId) throw new Error('Course ID is required');

      const moduleId = currentLesson.moduleId ||
        (currentCourse.modules?.length ? currentCourse.modules[0]._id : null);

      const endpoint = currentLesson._id
        ? `http://localhost:5000/api/lessons/${courseId}/lessons/${currentLesson._id}`
        : `http://localhost:5000/api/lessons/${courseId}/lessons`;

      const method = currentLesson._id ? 'PUT' : 'POST';

      const requestBody = {
        title: currentLesson.title,
        type: currentLesson.type,
        duration: currentLesson.duration,
        description: currentLesson.description || '',
        videoUrl: currentLesson.videoUrl,
        pdfUrl: currentLesson.pdfUrl || '', // Include PDF URL
        moduleId: moduleId || null
      };

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || 'Failed to save lesson');
      }

      // Update state
      setCourses(prevCourses => prevCourses.map(course => {
        if (course.id !== courseId) return course;

        if (currentLesson._id) {
          // Update existing lesson
          return {
            ...course,
            lessons: course.lessons.map(lesson =>
              lesson._id === currentLesson._id ? data.lesson : lesson
            )
          };
        } else {
          // Add new lesson
          const updatedCourse = {
            ...course,
            lessons: [...course.lessons, data.lesson]
          };

          // Update module if specified
          if (moduleId) {
            updatedCourse.modules = course.modules.map(module =>
              module._id === moduleId
                ? { ...module, lessons: [...module.lessons, data.lesson._id] }
                : module
            );
          }

          return updatedCourse;
        }
      }));

      setOpenLessonDialog(false);
      toast({
        title: 'Succès',
        description: `Leçon ${currentLesson._id ? 'mise à jour' : 'créée'} avec succès`,
      });

    } catch (error) {
      console.error('Error saving lesson:', error);
      toast({
        title: 'Erreur',
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

  const handleEditLesson = (lesson) => {
    setCurrentLesson({
      ...lesson,
      courseId: lesson.courseId || currentCourse.id
    });
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
        title: 'Succès',
        description: 'Course deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const courseId = currentCourse.id ||
        courses.find(c => c.lessons.some(l => l._id === lessonId))?.id;

      if (!courseId) throw new Error('Could not determine course for this lesson');

      const response = await fetch(
        `http://localhost:5000/api/lessons/${courseId}/lessons/${lessonId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete lesson');

      // Update state
      setCourses(courses.map(course => {
        if (course.id !== courseId) return course;

        return {
          ...course,
          lessons: course.lessons.filter(l => l._id !== lessonId),
          modules: course.modules?.map(module => ({
            ...module,
            lessons: module.lessons?.filter(id => id !== lessonId) || []
          })) || []
        };
      }));

      toast({ title: 'Succès', description: 'Leçon supprimée avec succès' });
    } catch (error) {
      toast({
        title: 'Erreur',
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
      id: quiz._id, // Make sure to set the id field
      courseId,
      questions: quiz.questions.map(q => ({
        id: q._id, // Make sure each question has its id
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        feedback: q.feedback || ''
      }))
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
        title: 'Succès',
        description: 'Quiz deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
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
          id: `temp-${Math.random().toString(36).substr(2, 9)}`, // Temporary ID
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
        title: 'Avertissement',
        description: 'Un quiz doit avoir au moins une question',
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
      {/* Course Dialog - Moved to top level */}
      <Dialog open={openCourseDialog} onOpenChange={setOpenCourseDialog}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentCourse.id ? 'Edit Course' : 'Add Course'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitCourse} className="space-y-4">
            <div className="space-y-2">
              <Label>Title*</Label>
              <Input
                value={currentCourse.title}
                onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description*</Label>
              <Textarea
                value={currentCourse.description}
                onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category*</Label>
                <Select
                  value={currentCourse.category}
                  onValueChange={(value) => setCurrentCourse({ ...currentCourse, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Level*</Label>
                <Select
                  value={currentCourse.level}
                  onValueChange={(value) => setCurrentCourse({ ...currentCourse, level: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Durée*</Label>
                <Input
                  value={currentCourse.duration}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                  placeholder="ex. 10 heures"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>URL de la miniature*</Label>
                <Input
                  value={currentCourse.thumbnail}
                  onChange={(e) => setCurrentCourse({ ...currentCourse, thumbnail: e.target.value })}
                  placeholder="https://exemple.com/image.jpg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Objectifs d'apprentissage (un par ligne)</Label>
              <Textarea
                value={Array.isArray(currentCourse.learningOutcomes)
                  ? currentCourse.learningOutcomes.join('\n')
                  : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setCurrentCourse({
                    ...currentCourse,
                    learningOutcomes: value.split('\n')
                  });
                }}
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">↻</span>
                    {currentCourse.id ? 'Mise à jour...' : 'Création...'}
                  </span>
                ) : (
                  currentCourse.id ? 'Mettre à jour le cours' : 'Créer le cours'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog - Moved to top level */}
      <Dialog open={openQuizDialog} onOpenChange={(open) => {
        setOpenQuizDialog(open);
        if (!open) {
          // Reset when dialog closes
          setCurrentQuiz(initQuiz());
        }
      }}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentQuiz.id ? 'Edit Quiz' : 'Create Quiz'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitQuiz} className="space-y-6">
            <div className="space-y-2">
              <Label>Title*</Label>
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
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Questions</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addQuestion}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              <div className="space-y-6">
                {currentQuiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-2 w-full">
                        <Label>Question {qIndex + 1}*</Label>
                        <Input
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          placeholder="Enter the question"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        disabled={currentQuiz.questions.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Options*</Label>
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-answer-${question.id}`}
                            checked={question.correctAnswer === oIndex}
                            onChange={() => updateQuestion(question.id, 'correctAnswer', oIndex)}
                            className="h-4 w-4"
                          />
                          <Input
                            value={option}
                            onChange={(e) => updateOption(question.id, oIndex, e.target.value)}
                            placeholder={`Option ${oIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label>Feedback</Label>
                      <Input
                        value={question.feedback}
                        onChange={(e) => updateQuestion(question.id, 'feedback', e.target.value)}
                        placeholder="Explanation for the correct answer"
                      />
                    </div>
                  </div>
                ))}
              </div>
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

      {/* Rest of your component remains the same */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Cours</h1>
        <Button
          onClick={() => {
            setOpenCourseDialog(true);
            setCurrentCourse(initCourse());
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Cours
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des cours..."
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
                <Dialog open={openLessonDialog} onOpenChange={(open) => {
                  setOpenLessonDialog(open);
                  if (!open) {
                    setCurrentLesson(initLesson());
                  }
                }}>
                  <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {currentLesson._id ? 'Edit Lesson' : 'Add Lesson'}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitLesson} className="space-y-4">
                      {/* Form fields should use currentLesson */}
                      <div className="space-y-2">
                        <Label>Title*</Label>
                        <Input
                          value={currentLesson.title}
                          onChange={(e) => setCurrentLesson({ ...currentLesson, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={currentLesson.description}
                          onChange={(e) => setCurrentLesson({ ...currentLesson, description: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type*</Label>
                          <Select
                            value={currentLesson.type}
                            onValueChange={(value) => setCurrentLesson({ ...currentLesson, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                              {lessonTypes.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Durée*</Label>
                          <Input
                            value={currentLesson.duration}
                            onChange={(e) => setCurrentLesson({ ...currentLesson, duration: e.target.value })}
                            placeholder="ex. 10 min"
                            required
                          />
                        </div>
                      </div>

                      {currentLesson.type === 'vidéo' && (
                        <>
                          <div className="space-y-2">
                            <Label>Video URL*</Label>
                            <Input
                              value={currentLesson.videoUrl}
                              onChange={(e) => setCurrentLesson({ ...currentLesson, videoUrl: e.target.value })}
                              placeholder="https://www.youtube.com/embed/..."
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Supporting PDF (Optional)</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".pdf"
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current.click()}
                                disabled={uploading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                {uploading ? `Uploading... ${uploadProgress}%` : 'Upload PDF'}
                              </Button>
                              {currentLesson.pdfUrl && (
                                <span className="text-sm text-green-600 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  PDF uploaded
                                </span>
                              )}
                            </div>
                          </div>

                          {currentLesson.pdfUrl && (
                            <div className="mt-4">
                              <Label>Aperçu PDF</Label>
                              <div className="mt-2 border rounded-lg p-4">
                                <iframe
                                  src={`http://localhost:5000${currentLesson.pdfUrl}`}
                                  className="w-full h-64"
                                  title="Aperçu PDF"
                                />
                                <a
                                  href={`http://localhost:5000${currentLesson.pdfUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                                >
                                  Ouvrir le PDF dans un nouvel onglet
                                </a>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {currentLesson.type === 'lecture' && (
                        <>
                          <div className="space-y-2">
                            <Label>Contenu de lecture*</Label>
                            <Textarea
                              value={currentLesson.readingContent}
                              onChange={(e) => setCurrentLesson({ ...currentLesson, readingContent: e.target.value })}
                              rows={6}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>PDF Material*</Label>
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".pdf"
                                style={{ display: 'none' }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current.click()}
                                disabled={uploading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                {uploading ? `Uploading... ${uploadProgress}%` : 'Upload PDF'}
                              </Button>
                              {currentLesson.pdfUrl && (
                                <span className="text-sm text-green-600 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  PDF uploaded
                                </span>
                              )}
                            </div>
                            {uploading && (
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>

                          {currentLesson.pdfUrl && (
                            <div className="mt-4">
                              <Label>Aperçu PDF</Label>
                              <div className="mt-2 border rounded-lg p-4">
                                <iframe
                                  src={`http://localhost:5000${currentLesson.pdfUrl}`}
                                  className="w-full h-64"
                                  title="Aperçu PDF"
                                />
                                <a
                                  href={`http://localhost:5000${currentLesson.pdfUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                                >
                                  Ouvrir le PDF dans un nouvel onglet
                                </a>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <DialogFooter>
                        <Button type="submit" disabled={loading}>
                          {loading ? (
                            <span className="flex items-center">
                              <span className="animate-spin mr-2">↻</span>
                              {currentLesson._id ? 'Updating...' : 'Creating...'}
                            </span>
                          ) : (
                            currentLesson._id ? 'Update Lesson' : 'Create Lesson'
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Lessons Section */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Lessons</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    resetLessonForm();
                    setCurrentLesson({ ...initLesson(), courseId: course.id });
                    setOpenLessonDialog(true);
                    setCurrentCourse(course)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lesson
                </Button>
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
                            {lesson.type === 'vidéo' && <PlayCircle className="h-4 w-4" />}
                            {lesson.type === 'lecture' && <FileText className="h-4 w-4" />}
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
                            onClick={() => {
                              handleEditLesson(lesson);
                              setCurrentCourse(course);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              handleDeleteLesson(lesson._id);
                              setCurrentCourse(course);
                            }}
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
