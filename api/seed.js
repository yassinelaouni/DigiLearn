require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('./config/db');

// Importer les modèles
const User = require('./models/User');
const Admin = require('./models/Admin');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
const Certificate = require('./models/Certificate');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const UserProgress = require('./models/UserProgress');

// Se connecter à la base de données
connectDB();

const seedDB = async () => {
  try {
    // Effacer les données existantes
    await User.deleteMany();
    await Admin.deleteMany();
    await Course.deleteMany();
    await Module.deleteMany();
    await Lesson.deleteMany();
    await Certificate.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();
    await UserProgress.deleteMany();

    console.log('Base de données effacée');

    // Créer l'utilisateur admin
    const adminPassword = "$2b$10$n1Afhe8rnkwLvS8YJuobbeBncdJRi5SC3F4yhmflJXYoWYIfVxGlW";
    const admin = await Admin.create({
      email: 'admin@example.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'Utilisateur',
      avatar: null,
      createdAt: new Date('2023-01-01')
    });

    // Créer des utilisateurs réguliers
    const user1Password = "$2b$10$n1Afhe8rnkwLvS8YJuobbeBncdJRi5SC3F4yhmflJXYoWYIfVxGlW";
    const user1 = await User.create({
      email: 'user1@example.com',
      password: user1Password,
      firstName: 'Jean',
      lastName: 'Dupont',
      balance: 100,
      avatar: null,
      createdAt: new Date('2023-01-15')
    });

    const user2Password = "$2b$10$n1Afhe8rnkwLvS8YJuobbeBncdJRi5SC3F4yhmflJXYoWYIfVxGlW";
    const user2 = await User.create({
      email: 'user2@example.com',
      password: user2Password,
      firstName: 'Jeanne',
      lastName: 'Petit',
      balance: 50,
      avatar: null,
      createdAt: new Date('2023-02-20')
    });

    const user3Password = "$2b$10$n1Afhe8rnkwLvS8YJuobbeBncdJRi5SC3F4yhmflJXYoWYIfVxGlW";
    const user3 = await User.create({
      email: 'yassineelaouni581@gmail.com',
      password: user3Password,
      firstName: 'Yassine',
      lastName: 'EL AOUNI',
      balance: 0,
      avatar: null,
      createdAt: new Date('2023-03-10')
    });

    console.log('Utilisateurs créés');

    // Créer des cours avec des modules et des leçons
    const courses = [
      // Cours 1
      {
        title: 'Compétences Informatiques Essentielles pour Débutants',
        slug: 'competences-informatiques-essentielles',
        category: 'Alphabétisation Numérique',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        duration: '45 minutes',
        level: 'Débutant',
        featured: true,
        description: "description du cours Compétences Informatiques Essentielles pour Débutants.",
        learningOutcomes: [
          "Comprendre les opérations informatiques de base",
          "Naviguer dans les systèmes d'exploitation",
          "Utiliser les applications logicielles essentielles",
          "Gérer les fichiers et les dossiers",
          "Techniques de dépannage de base"
        ],
        modules: [
          {
            title: 'Premiers Pas avec les Ordinateurs',
            order: 1,
            lessons: [
              {
                title: 'Introduction aux Ordinateurs',
                duration: '15 min',
                type: 'vidéo',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Apprenez les bases du matériel et des logiciels informatiques",
                order: 1
              },
              {
                title: 'Utilisation de la Souris et du Clavier',
                duration: '20 min',
                type: 'vidéo',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                order: 2
              },
              // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 1',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 1...', // Contenu générique
                order: 3
              }
            ]
          }
        ]
      },
      // Cours 2
      {
        title: "Principes Fondamentaux de la Sécurité et de la Confidentialité sur Internet",
        slug: "securite-internet",
        category: "Sécurité en Ligne",
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '60 minutes',
        level: 'Débutant',
        featured: true,
        description: "description du cours Principes Fondamentaux de la Sécurité et de la Confidentialité sur Internet.",
        learningOutcomes: [
          "Identifier les menaces en ligne",
          "Créer des mots de passe forts",
          "Comprendre les paramètres de confidentialité",
          "Reconnaître les tentatives de phishing",
          "Sécuriser les informations personnelles"
        ],
        modules: [
          {
            title: "Bases d'Internet",
            order: 1,
            lessons: [
              {
                title: "Comprendre Internet",
                duration: '15 min',
                type: 'vidéo',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                order: 1
              },
              {
                title: "Pratiques de Navigation Sécurisée",
                duration: '25 min',
                type: 'vidéo',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                description: "Apprenez à naviguer sur internet en toute sécurité",
                order: 2
              },
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 2',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 2...', // Contenu générique
                order: 3
              }
            ]
          }
        ]
      },
      // Cours 3
      {
        title: 'Maîtriser les Essentiels de Microsoft Office',
        slug: 'microsoft-office',
        category: 'Outils de Productivité',
        thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        duration: '90 minutes',
        level: 'Débutant',
        featured: true,
        description: "description du cours Maîtriser les Essentiels de Microsoft Office.",
        learningOutcomes: [
          "Créer des documents professionnels dans Word",
          "Construire des feuilles de calcul dans Excel",
          "Concevoir des présentations dans PowerPoint",
          "Organiser les e-mails dans Outlook",
          "Collaborer avec Office 365"
        ],
        modules: [
          {
            title: 'Fondamentaux de Word',
            order: 1,
            lessons: [
              {
                title: 'Introduction à Word',
                duration: '20 min',
                type: 'vidéo',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                order: 1
              },
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 3',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 3...', // Contenu générique
                order: 2
              }
            ]
          }
        ]
      },
      // Cours 4
      {
        title: 'Communication Efficace en Ligne',
        slug: 'communication-en-ligne',
        category: 'Essentiels du Web',
        thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        duration: '50 minutes',
        level: 'Débutant',
        featured: false,
        description: "description du cours Communication Efficace en Ligne.",
        learningOutcomes: [
          "Écrire des e-mails professionnels",
          "Participer à des discussions en ligne",
          "Utiliser des outils de visioconférence",
          "Pratiquer la netiquette",
          "Collaborer efficacement en ligne"
        ],
        modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 1',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 4',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 4...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 5
      {
        title: 'Création de Documents Professionnels',
        slug: 'documents-professionnels',
        category: 'Outils de Productivité',
        thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '75 minutes',
        level: 'Débutant',
        featured: false,
        description: "description du cours Création de Documents Professionnels.",
         modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 2',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 5',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 5...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 6
      {
        title: "Stratégies de Recherche d'Emploi à l'Ère Numérique",
        slug: "strategies-recherche-emploi",
        category: "Compétences Professionnelles",
        thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        duration: '65 minutes',
        level: 'Tous Niveaux',
        featured: true,
        description: "description du cours Stratégies de Recherche d'Emploi à l'Ère Numérique.",
        learningOutcomes: [
          "Créer des CV efficaces",
          "Rédiger des lettres de motivation percutantes",
          "Utiliser LinkedIn professionnellement",
          "Préparer des entrevues virtuelles",
          "Établir des liens professionnels en ligne"
        ],
         modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 3',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 6',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 6...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 7
      {
        title: 'Principes de Base des Appareils Mobiles',
        slug: 'principes-base-appareils-mobiles',
        category: 'Alphabétisation Numérique',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        duration: '40 minutes',
        level: 'Débutant',
        featured: false,
        description: "description du cours Principes de Base des Appareils Mobiles.",
        learningOutcomes: [
          "Naviguer dans les interfaces d'appareils intelligents",
          "Installer et gérer des applications",
          "Configurer les paramètres de l'appareil",
          "Utiliser des outils de productivité mobiles",
          "Résoudre les problèmes courants"
        ],
        modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 4',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 7',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 7...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 8
      {
        title: "Réseaux Sociaux pour Utilisation Professionnelle",
        slug: "reseaux-sociaux-utilisation-professionnelle",
        category: "Compétences Professionnelles",
        thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
        rating: 4.4,
        duration: '55 minutes',
        level: 'Débutant',
        featured: false,
        description: "description du cours Réseaux Sociaux pour Utilisation Professionnelle.",
        learningOutcomes: [
          "Établir une présence professionnelle en ligne",
          "Utiliser LinkedIn efficacement",
          "Établir des liens sur les réseaux sociaux",
          "Créer du contenu professionnel",
          "Gérer une réputation en ligne"
        ],
        modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 5',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 8',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 8...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 9
      {
        title: 'Stockage Cloud et Gestion des Fichiers',
        slug: 'stockage-cloud',
        category: 'Outils de Productivité',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '50 minutes',
        level: 'Débutant',
        featured: false,
        description: "description du cours Stockage Cloud et Gestion des Fichiers.",
        learningOutcomes: [
          "Utiliser Google Drive efficacement",
          "Organiser les fichiers dans le cloud",
          "Partager et collaborer sur des documents",
          "Sauvegarder des fichiers importants",
          "Accéder aux fichiers sur différents appareils"
        ],
        modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 6',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 9',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 9...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 10
      {
        title: 'Fondements du Développement Web',
        slug: 'fondements-developpement-web',
        category: 'Développement Web',
        thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '120 minutes',
        level: 'Débutant',
        featured: true,
        description: "description du cours Fondements du Développement Web.",
        learningOutcomes: [
          "Comprendre les bases d'HTML",
          "Styliser des pages avec CSS",
          "Ajouter de l'interactivité avec JavaScript",
          "Publier un simple site web",
          "Utiliser des outils de développement"
        ],
        modules: [ // Ajouter un module par défaut s'il n'existe pas
           {
            title: 'Module par Défaut 7',
            order: 1,
            lessons: [
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 10',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 10...', // Contenu générique
                order: 1
              }
            ]
          }
        ]
      },
      // Cours 12 (avec leçons de lecture)
      {
        title: 'Écriture Commerciale Efficace',
        slug: 'ecriture-commerciale',
        category: 'Compétences Professionnelles',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        duration: '75 minutes',
        level: 'Débutant',
        featured: true,
        description: "description du cours Écriture Commerciale Efficace.",
        learningOutcomes: [
          "Écrire des e-mails commerciaux clairs",
          "Structurer des rapports professionnels",
          "Créer des propositions persuasives",
          "Éditer pour la clarté et la concision",
          "Adapter le ton pour différentes audiences"
        ],
        modules: [
          {
            title: "Fondamentaux de l'Écriture Professionnelle",
            order: 1,
            lessons: [
              {
                title: "Principes de l'Écriture Professionnelle",
                duration: "20 minutes",
                type: "video",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Apprenez les principes fondamentaux qui rendent l'écriture professionnelle efficace",
                order: 1
              },
              {
                title: "Guide d'Étiquette de Courrier",
                duration: "15 minutes",
                type: "lecture",
                readingContent: "Ce guide complet couvre tous les aspects de la communication professionnelle par courrier électronique...",
                pdfUrl: "https://www.cs.cmu.edu/afs/cs.cmu.edu/user/gchen/www/download/java/LearnJava.pdf",
                order: 2
              },
              {
                title: "Atelier de Rédaction de Rapport",
                duration: "25 minutes",
                type: "lecture",
                readingContent: "Instructions étape par étape pour créer des rapports professionnels...",
                order: 3
              },
               // Leçon supplémentaire
              {
                title: 'Leçon Supplémentaire 11',
                duration: '10 min',
                type: 'lecture',
                readingContent: 'Contenu de la leçon supplémentaire 11...', // Contenu générique
                order: 4
              }
            ]
          }
        ]
      }
    ];

    // Créer des cours, modules et leçons
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

      // Créer des modules et des leçons pour le cours
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

            // Mettre à jour le module avec la référence de leçon
            module.lessons.push(lesson._id);
            await module.save();
          }

          // Mettre à jour le cours avec la référence de module
          course.modules.push(module._id);
          await course.save();
        }
      }

       // Créer un quiz pour ce cours
    const quizTitle = `Quiz pour ${course.title}`;
    const quiz = await Quiz.create({
      courseId: course._id,
      title: quizTitle,
      description: 'Testez vos connaissances sur ce cours.' // description générique
    });

    // Créer 4 questions génériques pour le quiz
    const genericQuestions = [
      {
        question: "Question générique 1 pour " + course.title + "?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: 0,
        feedback: "Commentaire pour la question 1."
      },
      {
        question: "Question générique 2 pour " + course.title + "?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 1,
        feedback: "Commentaire pour la question 2."
      },
      {
        question: "Question générique 3 pour " + course.title + "?",
        options: ["Choix Un", "Choix Deux", "Choix Trois", "Choix Quatre"],
        correctAnswer: 2,
        feedback: "Commentaire pour la question 3."
      },
      {
        question: "Question générique 4 pour " + course.title + "?",
        options: ["Réponse X", "Réponse Y", "Réponse Z", "Réponse W"],
        correctAnswer: 3,
        feedback: "Commentaire pour la question 4."
      }
    ];

    const createdQuestions = await Question.insertMany(genericQuestions.map(q => ({ ...q, quizId: quiz._id })));

    // Mettre à jour le quiz avec les références de question
    quiz.questions = createdQuestions.map(q => q._id);
    await quiz.save();

    // Mettre à jour le cours avec la référence de quiz
    course.quiz = quiz._id;
    await course.save();

    }

    console.log('Cours, modules et leçons créés');

    // Créer des certificats
    const cert1 = await Certificate.create({
      certificateId: 'CERT-ABC123',
      userId: user1._id,
      courseId: createdCourses[0]._id, // Compétences Informatiques Essentielles
      issueDate: new Date('2024-01-15'),
      isVerified: true,
      score: '18/20 (90%)'
    });

    const cert2 = await Certificate.create({
      certificateId: 'CERT-DEF456',
      userId: user2._id,
      courseId: createdCourses[2]._id, // Maîtriser les Essentiels de Microsoft Office
      issueDate: new Date('2024-02-20'),
      isVerified: true,
      score: '19/20 (95%)'
    });

    const cert3 = await Certificate.create({
      certificateId: 'CERT-GHI789',
      userId: user3._id,
      courseId: createdCourses[9]._id, // Fondements du Développement Web
      issueDate: new Date('2024-03-10'),
      isVerified: false,
      score: '17/20 (85%)'
    });

    // Mettre à jour les utilisateurs avec les références de certificat
    user1.certificates.push(cert1._id);
    await user1.save();

    user2.certificates.push(cert2._id);
    await user2.save();

    user3.certificates.push(cert3._id);
    await user3.save();

    // Mettre à jour les cours avec les références de certificat
    createdCourses[0].certificates.push(cert1._id);
    await createdCourses[0].save();

    createdCourses[2].certificates.push(cert2._id);
    await createdCourses[2].save();

    createdCourses[9].certificates.push(cert3._id);
    await createdCourses[9].save();

    console.log('Certificats créés');

    // Créer des enregistrements de progression de l'utilisateur
    // Note: Mettre à jour les titres des leçons si nécessaire
    const lesson1 = await Lesson.findOne({ title: 'Introduction aux Ordinateurs' });
    const lesson2 = await Lesson.findOne({ title: 'Utilisation de la Souris et du Clavier' });

    // Trouver la leçon supplémentaire pour le premier cours
    const additionalLesson1 = await Lesson.findOne({ title: 'Leçon Supplémentaire 1' });

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
      },
      {
        userId: user1._id,
        lessonId: additionalLesson1._id, // Ajouter la leçon supplémentaire à l'utilisateur
        completed: true
      }
    ]);

    console.log("Enregistrements de progression de l'utilisateur créés");

    console.log("Base de données semée avec succès!");
    process.exit();

  } catch (err) {
    console.error('Erreur lors de la semence de la base de données:', err);
    process.exit(1);
  }
};

seedDB();