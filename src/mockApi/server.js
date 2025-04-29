import { createServer, Model, belongsTo, hasMany } from 'miragejs';

createServer({
  models: {
    user: Model.extend({
      certificates: hasMany(),
      progresses: hasMany('userProgress'),
      quizzes: hasMany()
    }),
    course: Model.extend({
      modules: hasMany(),
      certificates: hasMany()
    }),
    module: Model.extend({
      course: belongsTo(),
      lessons: hasMany()
    }),
    lesson: Model.extend({
      module: belongsTo(),
      progresses: hasMany('userProgress')
    }),
    userProgress: Model.extend({
      user: belongsTo(),
      lesson: belongsTo(),
      completed: Boolean
    }),
    quiz: Model.extend({
      course: belongsTo()
    }),
    certificate: Model.extend({
      user: belongsTo(),
      course: belongsTo()
    }),
    admin: Model,
    course: Model.extend({
      certificates: hasMany(),
    }),
  },

  routes() {
    this.namespace = 'api';

    // User login
    this.post('/users/login', (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);
      const user = schema.users.findBy({ email });

      if (user && user.password === password) {
        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            balance: user.balance,
            avatar: user.avatar
          },
          token: 'user_auth_token',
          errorCode: "",
          errorMessage: "Login successful",
          errors: {}
        };
      }
      return {
        success: false,
        user: {},
        token: "",
        errorCode: "InvalidCredentials",
        errorMessage: 'Invalid email or password',
        errors: {}
      };
    });

    // Admin login
    this.post('/users/admin/login', (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);
      const admin = schema.admins.findBy({ email });

      if (admin && admin.password === password) {
        return {
          success: true,
          user: {
            id: admin.id,
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            avatar: admin.avatar
          },
          token: 'admin_auth_token',
          errorCode: "",
          errorMessage: "Admin login successful",
          errors: {}
        };
      }
      return {
        success: false,
        user: {},
        token: "",
        errorCode: "InvalidCredentials",
        errorMessage: 'Invalid admin credentials',
        errors: {}
      };
    });

    // User registration
    this.post('/users/register', (schema, request) => {
      const { email, password, firstName, lastName } = JSON.parse(request.requestBody);

      const existingUser = schema.users.findBy({ email });
      if (existingUser) {
        return {
          success: false,
          user: {},
          token: "",
          errorCode: "UserExists",
          errorMessage: 'User with this email already exists',
          errors: {}
        };
      }

      const user = schema.users.create({
        email,
        password,
        firstName,
        lastName,
        balance: 0,
        avatar: null
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        },
        token: 'new_user_token',
        errorCode: "",
        errorMessage: "Registration successful",
        errors: {}
      };
    });

    // Update avatar
    this.patch('/users/update/avatar', (schema, request) => {
      const { userId, avatar } = JSON.parse(request.requestBody);
      const user = schema.users.find(userId);

      if (!user) {
        return {
          success: false,
          updated: {},
          errorCode: "UserNotFound",
          errorMessage: `User with ID ${userId} not found`,
          errors: {}
        };
      }

      user.update({ avatar });
      return {
        success: true,
        updated: { avatar: user.avatar, userId: user.id },
        errorCode: "",
        errorMessage: "Avatar updated successfully",
        errors: {}
      };
    });

    // Update firstName
    this.patch('/users/update/firstName', (schema, request) => {
      const { userId, firstName } = JSON.parse(request.requestBody);
      const user = schema.users.find(userId);

      if (!user) {
        return {
          success: false,
          updated: {},
          errorCode: "UserNotFound",
          errorMessage: `User with ID ${userId} not found`,
          errors: {}
        };
      }

      user.update({ firstName });
      return {
        success: true,
        updated: { firstName: user.firstName, userId: user.id },
        errorCode: "",
        errorMessage: "firstName updated successfully",
        errors: {}
      };
    });

    // Update lastName
    this.patch('/users/update/lastName', (schema, request) => {
      const { userId, lastName } = JSON.parse(request.requestBody);
      const user = schema.users.find(userId);

      if (!user) {
        return {
          success: false,
          updated: {},
          errorCode: "UserNotFound",
          errorMessage: `User with ID ${userId} not found`,
          errors: {}
        };
      }

      user.update({ lastName });
      return {
        success: true,
        updated: { lastName: user.lastName, userId: user.id },
        errorCode: "",
        errorMessage: "lastName updated successfully",
        errors: {}
      };
    });

    // Update password
    this.patch('/users/update/password', (schema, request) => {
      const { userId, password } = JSON.parse(request.requestBody);
      const user = schema.users.find(userId);

      if (!user) {
        return {
          success: false,
          updated: {},
          errorCode: "UserNotFound",
          errorMessage: `User with ID ${userId} not found`,
          errors: {}
        };
      }

      user.update({ password });
      return {
        success: true,
        updated: { password: user.password, userId: user.id },
        errorCode: "",
        errorMessage: "Password updated successfully",
        errors: {}
      };
    });

    // Get user profile
    this.get('/users/get/profile', (schema, request) => {
      const { userId } = JSON.parse(request.requestBody);
      const user = schema.users.find(userId);

      if (!user) {
        return {
          success: false,
          user: {},
          errorCode: "UserNotFound",
          errorMessage: `User with ID ${userId} not found`,
          errors: {}
        };
      }

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          balance: user.balance,
          avatar: user.avatar
        },
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // Get all users (admin only)
    this.get('/users/get/all', () => {
      const users = schema.users.all();
      return {
        success: true,
        users: users.models.map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar
        })),
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // Issue a new certificate
    this.post('/certificates/issue', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const { userId, courseId, issueDate } = attrs;

      const user = schema.users.find(userId);
      const course = schema.courses.find(courseId);

      if (!user || !course) {
        return {
          success: false,
          certificate: null,
          errorCode: "NotFound",
          errorMessage: "User or course not found",
          errors: {}
        };
      }

      const certificate = schema.certificates.create({
        user,
        course,
        issueDate: issueDate || new Date().toISOString(),
        certificateId: `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        isVerified: false
      });

      return {
        success: true,
        certificate: {
          id: certificate.id,
          certificateId: certificate.certificateId,
          userId: user.id,
          courseId: course.id,
          issueDate: certificate.issueDate,
          isVerified: certificate.isVerified,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          },
          course: {
            title: course.title,
            description: course.description
          }
        },
        errorCode: "",
        errorMessage: "Certificate issued successfully",
        errors: {}
      };
    });

    // Get user's certificates
    this.get('/users/:userId/certificates', (schema, request) => {
      const userId = request.params.userId;
      const user = schema.users.find(userId);

      if (!user) {
        return {
          success: false,
          certificates: [],
          errorCode: "UserNotFound",
          errorMessage: "User not found",
          errors: {}
        };
      }

      const certificates = schema.certificates.where({ userId });

      return {
        success: true,
        certificates: certificates.models.map(cert => ({
          id: cert.id,
          certificateId: cert.certificateId,
          courseId: cert.courseId,
          courseTitle: cert.course.title,
          issueDate: cert.issueDate,
          isVerified: cert.isVerified
        })),
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // Verify a certificate
    this.get('/certificates/verify/:certificateId', (schema, request) => {
      const certificateId = request.params.certificateId;
      const certificate = schema.certificates.findBy({ certificateId });

      if (!certificate) {
        return {
          success: false,
          certificate: null,
          errorCode: "CertificateNotFound",
          errorMessage: "Certificate not found",
          errors: {}
        };
      }

      return {
        success: true,
        certificate: {
          certificateId: certificate.certificateId,
          user: {
            firstName: certificate.user.firstName,
            lastName: certificate.user.lastName,
            email: certificate.user.email
          },
          course: {
            title: certificate.course.title,
            description: certificate.course.description
          },
          issueDate: certificate.issueDate,
          isVerified: certificate.isVerified
        },
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // Admin: Get all certificates
    this.get('/admin/certificates', (schema, request) => {
      const certificates = schema.certificates.all();

      return {
        success: true,
        certificates: certificates.models.map(cert => ({
          id: cert.id,
          certificateId: cert.certificateId,
          userId: cert.userId,
          userEmail: cert.user.email,
          userName: `${cert.user.firstName} ${cert.user.lastName}`,
          courseId: cert.courseId,
          courseTitle: cert.course.title,
          issueDate: cert.issueDate,
          isVerified: cert.isVerified
        })),
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // Admin: Verify a certificate
    this.patch('/admin/certificates/verify/:certificateId', (schema, request) => {
      const certificateId = request.params.certificateId;
      const certificate = schema.certificates.findBy({ certificateId });

      if (!certificate) {
        return {
          success: false,
          certificate: null,
          errorCode: "CertificateNotFound",
          errorMessage: "Certificate not found",
          errors: {}
        };
      }

      certificate.update({ isVerified: true });

      return {
        success: true,
        certificate: {
          certificateId: certificate.certificateId,
          isVerified: certificate.isVerified
        },
        errorCode: "",
        errorMessage: "Certificate verified successfully",
        errors: {}
      };
    });

    // Get course by slug
    this.get('/courses/:slug', (schema, request) => {
      const slug = request.params.slug;
      const course = schema.courses.findBy({ slug });

      if (!course) {
        return {
          success: false,
          course: null,
          errorCode: "CourseNotFound",
          errorMessage: "Course not found",
          errors: {}
        };
      }

      // Load related data
      const modules = schema.modules.where({ courseId: course.id });
      const courseData = {
        ...course.attrs,
        modules: modules.models.map(module => ({
          ...module.attrs,
          lessons: schema.lessons.where({ moduleId: module.id }).models.map(lesson => lesson.attrs)
        })),
        learningOutcomes: course.learningOutcomes || []
      };

      return {
        success: true,
        course: courseData,
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // Get all featured courses
    this.get('/courses/featured', (schema) => {
      const featuredCourses = schema.courses.where({ featured: true });

      return {
        success: true,
        courses: featuredCourses.models.map(course => ({
          id: course.id,
          title: course.title,
          slug: course.slug,
          category: course.category,
          thumbnail: course.thumbnail,
          rating: course.rating,
          duration: course.duration,
          level: course.level,
          featured: course.featured
        })),
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    // In your MirageJS server setup
    this.get('/courses/:slug', (schema, request) => {
      const slug = request.params.slug;
      const course = schema.courses.findBy({ slug });

      if (!course) {
        return {
          success: false,
          course: null,
          errorCode: "CourseNotFound",
          errorMessage: "Course not found",
          errors: {}
        };
      }

      // Load related modules and lessons
      const modules = schema.modules.where({ courseId: course.id });

      return {
        success: true,
        course: {
          ...course.attrs,
          modules: modules.models.map(module => ({
            ...module.attrs,
            lessons: schema.lessons.where({ moduleId: module.id }).models.map(lesson => lesson.attrs)
          }))
        }
      };
    });

    this.get('/quiz', (schema, request) => {
      let courseId = request.queryParams.courseId;

      let quiz = schema.quizzes.findBy({ courseId });

      if (!quiz) {
        return {
          success: false,
          questions: [],
          errorCode: "QUIZ_NOT_FOUND",
          errorMessage: "No quiz found for this course.",
          errors: {}
        };
      }

      return {
        success: true,
        questions: quiz.questions,
        errorCode: "",
        errorMessage: "",
        errors: {}
      };
    });

    this.post('/certificates', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.certificates.create(attrs);
    });

    this.get('/user/dashboard/:userId', (schema, request) => {
      const userId = request.params.userId;
      
      // Find user with all relationships
      const user = schema.users.find(userId);
      if (!user) {
        return {
          success: false,
          errorMessage: "User not found"
        };
      }
    
      // Get user's progress with lesson relationships
      const userProgress = schema.userProgresses.where({ userId, completed: true }).models;
    
      // Get courses with all relationships
      const allCourses = schema.courses.all().models.map(course => {
        const modules = schema.modules.where({ courseId: course.id }).models.map(module => ({
          ...module.attrs,
          lessons: schema.lessons.where({ moduleId: module.id }).models
        }));
        
        return {
          ...course.attrs,
          modules
        };
      });
    
      // Prepare recent courses
      const recentCourses = allCourses.slice(0, 2).map(course => {
        const courseLessons = course.modules.flatMap(module => module.lessons);
        const completedLessons = courseLessons.filter(lesson => 
          userProgress.some(progress => progress.lessonId === lesson.id)
        );
    
        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
          progress: completedLessons.length,
          total: courseLessons.length
        };
      });
    
      return {
        success: true,
        data: {
          name: `${user.firstName} ${user.lastName}`,
          stats: {
            tutorialsCompleted: schema.certificates.where({ userId }).length,
            quizzesTaken: schema.quizzes.where({ userId }).length,
            lessonsCompleted: userProgress.length
          },
          recentCourses
        }
      };
    });

    // Get user progress
    this.get('/user/progress', (schema, request) => {
      const userId = request.queryParams.userId;
      const progress = schema.userProgresses.where({ userId });

      return {
        success: true,
        progress: progress.models.map(p => ({
          lessonId: p.lessonId,
          completed: p.completed
        }))
      };
    });

    // Mark lesson complete
    this.post('/user/progress', (schema, request) => {
      const { userId, lessonId } = JSON.parse(request.requestBody);

      // Find or create progress record
      let progress = schema.userProgresses.findBy({ userId, lessonId });

      if (!progress) {
        progress = schema.userProgresses.create({ userId, lessonId, completed: true });
      } else {
        progress.update({ completed: true });
      }

      return {
        success: true,
        progress: {
          lessonId: progress.lessonId,
          completed: progress.completed
        }
      };
    });



  },

  seeds(server) {
    // Create admin user
    server.create('admin', {
      id: '1',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: 'Yss@@56hh',
      avatar: null
    });

    // Create regular users
    server.create('user', {
      id: '1',
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
      balance: 100,
      avatar: null
    });

    server.create('user', {
      id: '2',
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      password: 'Yss@@56hh',
      balance: 50,
      avatar: null
    });

    server.create('user', {
      id: '3',
      email: 'yassineelaouni581@gmail.com',
      firstName: 'Yassine',
      lastName: 'EL AOUNI',
      password: 'Yss@@56hh',
      balance: 0,
      avatar: null
    });



    // Create 20 courses with modules and lessons
    const courses = [
      // Course 1
      {
        id: '1',
        title: 'Essential Computer Skills for Beginners',
        slug: 'essential-computer-skills',
        category: 'Digital Literacy',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        duration: '45 mins',
        level: 'Beginner',
        featured: true,
        learningOutcomes: [
          "Understand basic computer operations",
          "Navigate operating systems",
          "Use essential software applications",
          "Manage files and folders",
          "Basic troubleshooting techniques"
        ],
        modules: [
          {
            id: 'm1',
            title: 'Getting Started with Computers',
            lessons: [
              {
                id: 'l1',
                title: 'Introduction to Computers',
                duration: '15 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Learn the basics of computer hardware and software"
              },
              {
                id: 'l2',
                title: 'Using the Mouse and Keyboard',
                duration: '20 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
              }
            ]
          }
        ]
      },

      // Course 2
      {
        id: '2',
        title: 'Internet Safety & Privacy Fundamentals',
        slug: 'internet-safety',
        category: 'Online Safety',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '60 mins',
        level: 'Beginner',
        featured: true,
        learningOutcomes: [
          "Identify online threats",
          "Create strong passwords",
          "Understand privacy settings",
          "Recognize phishing attempts",
          "Secure personal information"
        ],
        modules: [
          {
            id: 'm2',
            title: 'Internet Basics',
            lessons: [
              {
                id: 'l3',
                title: 'Understanding the Internet',
                duration: '15 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
              },
              {
                id: 'l4',
                title: 'Safe Browsing Practices',
                duration: '25 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Learn how to browse the internet safely and securely"
              }
            ]
          }
        ]
      },

      // Course 3
      {
        id: '3',
        title: 'Mastering Microsoft Office Essentials',
        slug: 'microsoft-office',
        category: 'Productivity Tools',
        thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        duration: '90 mins',
        level: 'Beginner to Intermediate',
        featured: true,
        learningOutcomes: [
          "Create professional documents in Word",
          "Build spreadsheets in Excel",
          "Design presentations in PowerPoint",
          "Organize emails in Outlook",
          "Collaborate with Office 365"
        ],
        modules: [
          {
            id: 'm3',
            title: 'Word Fundamentals',
            lessons: [
              {
                id: 'l5',
                title: 'Introduction to Word',
                duration: '20 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
              }
            ]
          }
        ]
      },

      // Course 4-20 would follow the same pattern...
      // Here's a condensed version of additional courses:

      // Course 4
      {
        id: '4',
        title: 'Effective Online Communication',
        slug: 'online-communication',
        category: 'Web Essentials',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        duration: '50 mins',
        level: 'Beginner',
        featured: false,
        learningOutcomes: [
          "Write professional emails",
          "Participate in online discussions",
          "Use video conferencing tools",
          "Practice netiquette",
          "Collaborate online effectively"
        ],
        modules: []
      },

      // Course 5
      {
        id: '5',
        title: 'Creating Professional Documents',
        slug: 'professional-documents',
        category: 'Productivity Tools',
        thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '75 mins',
        level: 'Beginner',
        featured: false,
        learningOutcomes: [
          "Format business letters",
          "Create reports",
          "Design flyers",
          "Use templates effectively",
          "Apply professional styling"
        ],
        modules: []
      },

      // Continue with courses 6-20...
      // Each would follow the same structure with id, title, slug, etc.
      // For brevity, I'll show just the course definitions without modules/lessons

      // Course 6
      {
        id: '6',
        title: 'Job Search Strategies for Digital Age',
        slug: 'job-search-strategies',
        category: 'Career Skills',
        thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        duration: '65 mins',
        level: 'All Levels',
        featured: true,
        learningOutcomes: [
          "Create effective resumes",
          "Write compelling cover letters",
          "Use LinkedIn professionally",
          "Prepare for virtual interviews",
          "Network online effectively"
        ],
        modules: []
      },

      // Course 7
      {
        id: '7',
        title: 'Mobile Device Basics',
        slug: 'mobile-device-basics',
        category: 'Digital Literacy',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        duration: '40 mins',
        level: 'Beginner',
        featured: false,
        learningOutcomes: [
          "Navigate smartphone interfaces",
          "Install and manage apps",
          "Configure device settings",
          "Use mobile productivity tools",
          "Troubleshoot common issues"
        ],
        modules: []
      },

      // Course 8
      {
        id: '8',
        title: 'Social Media for Professional Use',
        slug: 'social-media-professional',
        category: 'Career Skills',
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
        rating: 4.4,
        duration: '55 mins',
        level: 'Beginner',
        featured: false,
        learningOutcomes: [
          "Build a professional online presence",
          "Use LinkedIn effectively",
          "Network on social media",
          "Create professional content",
          "Manage online reputation"
        ],
        modules: []
      },

      // Course 9
      {
        id: '9',
        title: 'Cloud Storage & File Management',
        slug: 'cloud-storage',
        category: 'Productivity Tools',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '50 mins',
        level: 'Beginner',
        featured: false,
        learningOutcomes: [
          "Use Google Drive effectively",
          "Organize files in the cloud",
          "Share and collaborate on documents",
          "Backup important files",
          "Access files across devices"
        ],
        modules: []
      },

      // Course 10
      {
        id: '10',
        title: 'Web Development Fundamentals',
        slug: 'web-development-fundamentals',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '120 mins',
        level: 'Beginner',
        featured: true,
        learningOutcomes: [
          "Understand HTML basics",
          "Style pages with CSS",
          "Add interactivity with JavaScript",
          "Publish a simple website",
          "Use developer tools"
        ],
        modules: []
      },

      // Course 11-20 would continue similarly...
      // For example:

      // Course 11
      {
        id: '11',
        title: 'Digital Marketing Essentials',
        slug: 'digital-marketing-essentials',
        category: 'Digital Marketing',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        duration: '90 mins',
        level: 'Beginner',
        featured: false,
        learningOutcomes: [
          "Understand digital marketing channels",
          "Create social media strategies",
          "Run basic ad campaigns",
          "Analyze marketing metrics",
          "Optimize online presence"
        ],
        modules: []
      },

      // Continue this pattern up to Course 20...
      // Each course would have similar structure with appropriate details
    ];

    // Create all courses, modules, and lessons
    courses.forEach(courseData => {
      const course = server.create('course', {
        id: courseData.id,
        title: courseData.title,
        slug: courseData.slug,
        category: courseData.category,
        thumbnail: courseData.thumbnail,
        rating: courseData.rating,
        duration: courseData.duration,
        level: courseData.level,
        featured: courseData.featured,
        learningOutcomes: courseData.learningOutcomes
      });

      // Create modules and lessons for each course
      courseData.modules.forEach(moduleData => {
        const module = server.create('module', {
          id: moduleData.id,
          title: moduleData.title,
          courseId: course.id
        });

        moduleData.lessons.forEach(lessonData => {
          server.create('lesson', {
            id: lessonData.id,
            moduleId: module.id,
            title: lessonData.title,
            duration: lessonData.duration,
            type: lessonData.type,
            videoUrl: lessonData.videoUrl,
            description: lessonData.description
          });
        });
      });
    });
    server.create('certificate', {
      id: 'cert-1',
      certificateId: 'CERT-ABC123',
      userId: '1',
      courseId: '1', // Essential Computer Skills for Beginners
      issueDate: new Date('2024-01-15').toISOString(),
      isVerified: true,
      score: '18/20 (90%)'
    });

    server.create('certificate', {
      id: 'cert-2',
      certificateId: 'CERT-DEF456',
      userId: '1',
      courseId: '3', // Mastering Microsoft Office Essentials
      issueDate: new Date('2024-02-20').toISOString(),
      isVerified: true,
      score: '19/20 (95%)'
    });

    server.create('certificate', {
      id: 'cert-3',
      certificateId: 'CERT-GHI789',
      userId: '1',
      courseId: '10', // Web Development Fundamentals
      issueDate: new Date('2024-03-10').toISOString(),
      isVerified: false, // Pending verification
      score: '17/20 (85%)'
    });

    // Create quizzes
    server.create('quiz', {
      id: '1',
      courseId: '1', // Quiz for course with id 1
      questions: [
        {
          id: 1,
          question: "When you use a Canva template, what can you edit?",
          options: [
            "Everything for the first five minutes.",
            "Everything.",
            "It depends what subscription plan you are on.",
            "Each template has its own specific rules for editing."
          ],
          correctAnswer: 1,
          feedback: "That's right. Canva templates are just the beginning..."
        },
        {
          id: 2,
          question: "How can you transfer designs between devices in Canva?",
          options: [
            "Transfer your files manually using a USB connection.",
            "Designs sync automatically across devices when logged in.",
            "Email the designs to yourself.",
            "Canva doesn't support cross-device work."
          ],
          correctAnswer: 1,
          feedback: "Not quite. We want designing to feel seamless..."
        }
      ]
    });

        // THEN create user progress records
        server.create('userProgress', {
          userId: '1',
          lessonId: 'l1',  // Must match an existing lesson ID
          completed: true
        });
    
        server.create('userProgress', {
          userId: '1',
          lessonId: 'l2',  // Must match an existing lesson ID
          completed: false
        });


  }
});