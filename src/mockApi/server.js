import { createServer, Model, belongsTo, hasMany } from 'miragejs';

createServer({
  models: {
    user: Model.extend({
      certificates: hasMany()
    }),
    admin: Model,
    course: Model.extend({
      certificates: hasMany()
    }),
    certificate: Model.extend({
      user: belongsTo(),
      course: belongsTo()
    }),
    module: Model.extend({
      course: belongsTo(),
      lessons: hasMany()
    }),
    lesson: Model.extend({
      module: belongsTo()
    })
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

    const course = server.create('course', {
      id: '1',
      title: 'Marketing with Canva',
      slug: 'social-media-marketing',
      category: 'Digital Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      rating: 4.0,
      duration: '120 mins',
      level: 'Beginner',
      description: 'Learn to create stunning social media content with Canva',
      learningOutcomes: [
        "Effective social media management",
        "Brand optimization and consistency",
        "Social video production",
        "Integrated advertising strategies",
        "Team collaboration and ROI analysis"
      ]
    });

    // Create module
    const module = server.create('module', {
      id: 'm1',
      courseId: course.id
    });

    // Create lessons
    server.create('lesson', {
      id: 'l1',
      moduleId: module.id,
      title: 'Welcome to Marketing with Canva',
      duration: '15 min',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8'
    });

    server.create('lesson', {
      id: 'l2',
      moduleId: module.id,
      title: 'Managing your social media',
      duration: '25 min',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8',
      description: "Enhance your social media game with Canva's templates"
    });

    // Add other lessons...
    server.create('lesson', {
      id: 'l3',
      moduleId: module.id,
      title: 'Optimizing brand presence',
      duration: '20 min',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8'
    });

    server.create('lesson', {
      id: 'l4',
      moduleId: module.id,
      title: 'Social video editing basics',
      duration: '30 min',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8'
    });

    server.create('lesson', {
      id: 'l5',
      moduleId: module.id,
      title: 'Advanced social video',
      duration: '30 min',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/aKZIlPzX5s8'
    });

  }
});