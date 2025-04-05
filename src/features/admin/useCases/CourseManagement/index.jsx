import React, { useState } from 'react';
import { BookOpen, Search, Edit, Plus, Trash2 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const AdminCourses = () => {
  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Digital Marketing'
  ];

  const lessonTypes = ['video', 'reading'];

  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'Marketing with Canva',
      description: 'Learn to create stunning social media content with Canva',
      category: 'Digital Marketing',
      students: 210,
      duration: '5 hours',
      level: 'Beginner',
      thumbnail: 'https://example.com/canva-thumbnail.jpg',
      createdAt: '2023-03-10',
      lessons: [
        {
          id: 'l1',
          title: 'Welcome to Marketing with Canva',
          duration: '15 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8',
          description: 'Introduction to the course'
        },
        {
          id: 'l2',
          title: 'Managing your social media',
          duration: '25 min',
          type: 'video',
          videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8',
          description: "Enhance your social media game with Canva's templates"
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(initCourse());
  const [currentLesson, setCurrentLesson] = useState(initLesson());

  function initCourse() {
    return {
      id: '',
      title: '',
      description: '',
      category: '',
      duration: '',
      level: 'Beginner',
      thumbnail: '',
      lessons: []
    };
  }

  function initLesson() {
    return {
      id: '',
      title: '',
      type: 'video',
      duration: '',
      videoUrl: '',
      description: '',
      courseId: ''
    };
  }

  const handleSubmitCourse = (e) => {
    e.preventDefault();
    if (currentCourse.id) {
      setCourses(courses.map(c => c.id === currentCourse.id ? currentCourse : c));
    } else {
      const newId = (courses.length + 1).toString();
      setCourses([...courses, {
        ...currentCourse,
        id: newId,
        students: 0,
        createdAt: new Date().toISOString().split('T')[0],
        lessons: []
      }]);
    }
    setOpenCourseDialog(false);
    resetCourseForm();
  };

  const handleSubmitLesson = (e) => {
    e.preventDefault();
    const course = courses.find(c => c.id === currentLesson.courseId);
    if (!course) return;

    if (currentLesson.id) {
      // Update lesson
      const updatedLessons = course.lessons.map(l => 
        l.id === currentLesson.id ? currentLesson : l
      );
      setCourses(courses.map(c => 
        c.id === course.id ? {...c, lessons: updatedLessons} : c
      ));
    } else {
      // Add new lesson
      const newId = `l${course.lessons.length + 1}`;
      setCourses(courses.map(c => 
        c.id === course.id 
          ? {...c, lessons: [...c.lessons, {...currentLesson, id: newId}]} 
          : c
      ));
    }
    setOpenLessonDialog(false);
    resetLessonForm();
  };

  const handleEditCourse = (course) => {
    setCurrentCourse({...course});
    setOpenCourseDialog(true);
  };

  const handleEditLesson = (courseId, lesson) => {
    setCurrentLesson({...lesson, courseId});
    setOpenLessonDialog(true);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  const handleDeleteLesson = (courseId, lessonId) => {
    setCourses(courses.map(c => 
      c.id === courseId 
        ? {...c, lessons: c.lessons.filter(l => l.id !== lessonId)} 
        : c
    ));
  };

  const resetCourseForm = () => setCurrentCourse(initCourse());
  const resetLessonForm = () => setCurrentLesson(initLesson());

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Dialog open={openCourseDialog} onOpenChange={setOpenCourseDialog}>
          <DialogTrigger asChild>
            <Button onClick={resetCourseForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {currentCourse.id ? 'Edit Course' : 'Add New Course'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitCourse} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title*</Label>
                  <Input
                    value={currentCourse.title}
                    onChange={(e) => setCurrentCourse({...currentCourse, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category*</Label>
                  <Select 
                    value={currentCourse.category} 
                    onValueChange={(value) => setCurrentCourse({...currentCourse, category: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description*</Label>
                <Textarea
                  value={currentCourse.description}
                  onChange={(e) => setCurrentCourse({...currentCourse, description: e.target.value})}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration*</Label>
                  <Input
                    value={currentCourse.duration}
                    onChange={(e) => setCurrentCourse({...currentCourse, duration: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level*</Label>
                  <Select
                    value={currentCourse.level}
                    onValueChange={(value) => setCurrentCourse({...currentCourse, level: value})}
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

              <div className="space-y-2">
                <Label>Thumbnail URL</Label>
                <Input
                    value={currentCourse.thumbnail}
                    onChange={(e) => setCurrentCourse({...currentCourse, thumbnail: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setOpenCourseDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentCourse.id ? 'Update Course' : 'Add Course'}
                </Button>
              </div>
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

      <div className="space-y-6">
        {courses.map(course => (
          <div key={course.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{course.title}</h2>
                <p className="text-muted-foreground">{course.category} • {course.level}</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEditCourse(course)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <p className="mb-4">{course.description}</p>

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Lessons</h3>
              <Dialog open={openLessonDialog} onOpenChange={setOpenLessonDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      resetLessonForm();
                      setCurrentLesson({...initLesson(), courseId: course.id});
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {currentLesson.id ? 'Edit Lesson' : 'Add Lesson'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitLesson} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title*</Label>
                      <Input
                        value={currentLesson.title}
                        onChange={(e) => setCurrentLesson({...currentLesson, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type*</Label>
                        <Select
                          value={currentLesson.type}
                          onValueChange={(value) => setCurrentLesson({...currentLesson, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {lessonTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duration*</Label>
                        <Input
                          value={currentLesson.duration}
                          onChange={(e) => setCurrentLesson({...currentLesson, duration: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    {currentLesson.type === 'video' && (
                      <div className="space-y-2">
                        <Label>Video URL*</Label>
                        <Input
                          value={currentLesson.videoUrl}
                          onChange={(e) => setCurrentLesson({...currentLesson, videoUrl: e.target.value})}
                          required={currentLesson.type === 'video'}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={currentLesson.description}
                        onChange={(e) => setCurrentLesson({...currentLesson, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setOpenLessonDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {currentLesson.id ? 'Update Lesson' : 'Add Lesson'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.lessons.map(lesson => (
                  <TableRow key={lesson.id}>
                    <TableCell className="font-medium">
                      {lesson.title}
                      {lesson.description && (
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{lesson.type}</span>
                    </TableCell>
                    <TableCell>{lesson.duration}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => handleEditLesson(course.id, lesson)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteLesson(course.id, lesson.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;