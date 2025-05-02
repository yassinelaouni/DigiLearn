require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('./config/db');

// Import models
const User = require('./models/User');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
const Certificate = require('./models/Certificate');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const UserProgress = require('./models/UserProgress');

// Connect to database
connectDB();

const seedDB = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Admin.deleteMany();
    await Course.deleteMany();
    await Module.deleteMany();
    await Lesson.deleteMany();
    await Certificate.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();
    await UserProgress.deleteMany();

    console.log('Database cleared');

    // Create admin user
    const adminPassword = await bcrypt.hash('Yss@@56hh', 10);
    const admin = await Admin.create({
      email: 'admin@example.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      avatar: null,
      createdAt: new Date('2023-01-01')
    });

    // Create regular users
    const user1Password = await bcrypt.hash('password123', 10);
    const user1 = await User.create({
      email: 'user1@example.com',
      password: user1Password,
      firstName: 'John',
      lastName: 'Doe',
      balance: 100,
      avatar: null,
      createdAt: new Date('2023-01-15')
    });

    const user2Password = await bcrypt.hash('Yss@@56hh', 10);
    const user2 = await User.create({
      email: 'user2@example.com',
      password: user2Password,
      firstName: 'Jane',
      lastName: 'Smith',
      balance: 50,
      avatar: null,
      createdAt: new Date('2023-02-20')
    });

    const user3Password = await bcrypt.hash('Yss@@56hh', 10);
    const user3 = await User.create({
      email: 'yassineelaouni581@gmail.com',
      password: user3Password,
      firstName: 'Yassine',
      lastName: 'EL AOUNI',
      balance: 0,
      avatar: null,
      createdAt: new Date('2023-03-10')
    });

    console.log('Users created');

    // Create courses with modules and lessons
    const courses = [
      // Course 1
      {
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
            title: 'Getting Started with Computers',
            order: 1,
            lessons: [
              {
                title: 'Introduction to Computers',
                duration: '15 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Learn the basics of computer hardware and software",
                order: 1
              },
              {
                title: 'Using the Mouse and Keyboard',
                duration: '20 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                order: 2
              }
            ]
          }
        ]
      },
      // Course 2
      {
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
            title: 'Internet Basics',
            order: 1,
            lessons: [
              {
                title: 'Understanding the Internet',
                duration: '15 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                order: 1
              },
              {
                title: 'Safe Browsing Practices',
                duration: '25 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Learn how to browse the internet safely and securely",
                order: 2
              }
            ]
          }
        ]
      },
      // Course 3
      {
        title: 'Mastering Microsoft Office Essentials',
        slug: 'microsoft-office',
        category: 'Productivity Tools',
        thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        duration: '90 mins',
        level: 'Beginner',
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
            title: 'Word Fundamentals',
            order: 1,
            lessons: [
              {
                title: 'Introduction to Word',
                duration: '20 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                order: 1
              }
            ]
          }
        ]
      },
      // Course 4
      {
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
      // Course 6
      {
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
      // Course 12 (with reading lessons)
      {
        title: 'Effective Business Writing',
        slug: 'business-writing',
        category: 'Professional Skills',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '75 mins',
        level: 'Beginner',
        featured: true,
        learningOutcomes: [
          "Write clear business emails",
          "Structure professional reports",
          "Create persuasive proposals",
          "Edit for clarity and conciseness",
          "Adapt tone for different audiences"
        ],
        modules: [
          {
            title: 'Business Writing Fundamentals',
            order: 1,
            lessons: [
              {
                title: 'Principles of Effective Writing',
                duration: '20 min',
                type: 'video',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Learn the core principles that make business writing effective",
                order: 1
              },
              {
                title: 'Email Etiquette Guide',
                duration: '15 min',
                type: 'reading',
                readingContent: 'This comprehensive guide covers all aspects of professional email communication...',
                pdfUrl: "https://www.cs.cmu.edu/afs/cs.cmu.edu/user/gchen/www/download/java/LearnJava.pdf",
                order: 2
              },
              {
                title: 'Report Writing Workshop',
                duration: '25 min',
                type: 'reading',
                readingContent: 'Step-by-step instructions for creating professional business reports...',
                order: 3
              }
            ]
          }
        ]
      }
    ];

    // Create courses, modules, and lessons
    const createdCourses = [];
    for (const courseData of courses) {
      const course = await Course.create({
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

      createdCourses.push(course);

      // Only process modules if they exist
      if (courseData.modules && courseData.modules.length > 0) {
        for (const moduleData of courseData.modules) {
          const module = await Module.create({
            title: moduleData.title,
            courseId: course._id,
            order: moduleData.order
          });

          for (const lessonData of moduleData.lessons) {
            const lesson = await Lesson.create({
              title: lessonData.title,
              moduleId: module._id,
              courseId: course._id,
              duration: lessonData.duration,
              type: lessonData.type,
              videoUrl: lessonData.videoUrl,
              readingContent: lessonData.readingContent,
              pdfUrl: lessonData.pdfUrl,
              description: lessonData.description,
              order: lessonData.order
            });

            // Update module with lesson reference
            module.lessons.push(lesson._id);
            await module.save();
          }

          // Update course with module reference
          course.modules.push(module._id);
          await course.save();
        }
      }
    }

    console.log('Courses, modules, and lessons created');

    // Create certificates
    const cert1 = await Certificate.create({
      certificateId: 'CERT-ABC123',
      userId: user1._id,
      courseId: createdCourses[0]._id, // Essential Computer Skills
      issueDate: new Date('2024-01-15'),
      isVerified: true,
      score: '18/20 (90%)'
    });

    const cert2 = await Certificate.create({
      certificateId: 'CERT-DEF456',
      userId: user2._id,
      courseId: createdCourses[2]._id, // Microsoft Office
      issueDate: new Date('2024-02-20'),
      isVerified: true,
      score: '19/20 (95%)'
    });

    const cert3 = await Certificate.create({
      certificateId: 'CERT-GHI789',
      userId: user3._id,
      courseId: createdCourses[9]._id, // Web Development
      issueDate: new Date('2024-03-10'),
      isVerified: false,
      score: '17/20 (85%)'
    });

    // Update users with certificate references
    user1.certificates.push(cert1._id);
    await user1.save();

    user2.certificates.push(cert2._id);
    await user2.save();

    user3.certificates.push(cert3._id);
    await user3.save();

    // Update courses with certificate references
    createdCourses[0].certificates.push(cert1._id);
    await createdCourses[0].save();

    createdCourses[2].certificates.push(cert2._id);
    await createdCourses[2].save();

    createdCourses[9].certificates.push(cert3._id);
    await createdCourses[9].save();

    console.log('Certificates created');

    // Create quiz for first course
    const quiz1 = await Quiz.create({
      courseId: createdCourses[0]._id // Essential Computer Skills course
    });

    // Create questions for the quiz
    const question1 = await Question.create({
      quizId: quiz1._id,
      question: "When you use a Canva template, what can you edit?",
      options: [
        "Everything for the first five minutes.",
        "Everything.",
        "It depends what subscription plan you are on.",
        "Each template has its own specific rules for editing."
      ],
      correctAnswer: 1, // Index of correct option (0-based)
      feedback: "That's right. Canva templates are just the beginning..."
    });

    const question2 = await Question.create({
      quizId: quiz1._id,
      question: "How can you transfer designs between devices in Canva?",
      options: [
        "Transfer your files manually using a USB connection.",
        "Designs sync automatically across devices when logged in.",
        "Email the designs to yourself.",
        "Canva doesn't support cross-device work."
      ],
      correctAnswer: 1, // Index of correct option (0-based)
      feedback: "Not quite. We want designing to feel seamless..."
    });

    // Update quiz with question references
    quiz1.questions = [question1._id, question2._id];
    await quiz1.save();

    // Update course with quiz reference
    createdCourses[0].quiz = quiz1._id;
    await createdCourses[0].save();

    console.log('Quiz and questions created successfully');

    // Update course with quiz reference
    createdCourses[0].quiz = quiz1._id;
    await createdCourses[0].save();

    console.log('Quiz and questions created');

    // Create user progress records
    const lesson1 = await Lesson.findOne({ title: 'Introduction to Computers' });
    const lesson2 = await Lesson.findOne({ title: 'Using the Mouse and Keyboard' });

    await UserProgress.create([
      {
        userId: user1._id,
        lessonId: lesson1._id,
        completed: true
      },
      {
        userId: user1._id,
        lessonId: lesson2._id,
        completed: false
      }
    ]);

    console.log('User progress records created');

    console.log('Database seeded successfully!');
    process.exit();

  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();