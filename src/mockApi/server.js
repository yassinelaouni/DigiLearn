import { createServer, Model } from 'miragejs';

createServer({
  models: {
    user: Model,
    admin: Model,
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
  },

  seeds(server) {
    // Create admin user
    server.create('admin', {
      id: '1',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: 'admin123',
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
      password: 'password123',
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
  }
});