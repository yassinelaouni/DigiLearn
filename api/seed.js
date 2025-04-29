require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
const Quiz = require('./models/Quiz');

connectDB();

const seedDB = async () => {
  // Clear existing data
  await User.deleteMany();
  await Admin.deleteMany();
  await Course.deleteMany();
  await Module.deleteMany();
  await Lesson.deleteMany();
  await Quiz.deleteMany();

  // Create admin user
  const admin = await Admin.create({
    email: 'admin@example.com',
    password: 'Yss@@56hh',
    firstName: 'Admin',
    lastName: 'User',
  });

  // Create regular users
  const user1 = await User.create({
    email: 'user1@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    balance: 100,
  });

  const user2 = await User.create({
    email: 'user2@example.com',
    password: 'Yss@@56hh',
    firstName: 'Jane',
    lastName: 'Smith',
    balance: 50,
  });

  const user3 = await User.create({
    email: 'yassineelaouni581@gmail.com',
    password: 'Yss@@56hh',
    firstName: 'Yassine',
    lastName: 'EL AOUNI',
    balance: 0,
  });

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
    // Add more courses as needed...
  ];

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
      learningOutcomes: courseData.learningOutcomes,
    });

    for (const moduleData of courseData.modules) {
      const module = await Module.create({
        title: moduleData.title,
        courseId: course._id,
        order: moduleData.order,
      });

      for (const lessonData of moduleData.lessons) {
        await Lesson.create({
          title: lessonData.title,
          moduleId: module._id,
          duration: lessonData.duration,
          type: lessonData.type,
          videoUrl: lessonData.videoUrl,
          description: lessonData.description,
          order: lessonData.order,
        });
      }
    }
  }

  // Create quiz for first course
  const firstCourse = await Course.findOne();
  await Quiz.create({
    courseId: firstCourse._id,
    questions: [
      {
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

  console.log('Database seeded successfully');
  process.exit();
};

seedDB();