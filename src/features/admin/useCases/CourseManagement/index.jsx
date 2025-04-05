import { useState, useEffect } from 'react';
import { BookOpen, Search, Edit, Trash2, Plus, Video } from 'lucide-react';
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

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses || []));
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
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

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Lessons</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    {course.title}
                  </div>
                </TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    {course.lessons?.length || 0}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCourses;