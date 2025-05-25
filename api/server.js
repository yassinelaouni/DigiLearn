require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create upload directories if they don't exist
const uploadDirs = [
  path.join(__dirname, 'public/uploads/avatars'),
  path.join(__dirname, 'uploads/course-thumbnails'),
  path.join(__dirname, 'uploads/pdfs')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Multer configuration for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/course-thumbnails/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: Only image files are allowed!'), false);
};

const uploadImage = multer({ 
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Multer configuration for PDFs
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = 'uploads/pdfs/';
    // Ensure directory exists
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  }
});

const uploadPdf = multer({ 
  storage: pdfStorage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1
  }
});

// Static files with cache control
const staticOptions = {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['pdf', 'jpg', 'jpeg', 'png', 'gif'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path) {
    res.set('x-timestamp', Date.now());
  }
};

app.use('/pdfs', express.static(path.join(__dirname, 'uploads/pdfs'), staticOptions));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), staticOptions));
app.use('/course-thumbnails', express.static(path.join(__dirname, 'uploads/course-thumbnails'), staticOptions));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  if (req.file) {
    console.log('Uploaded file:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });
  }
  next();
});

// Enhanced PDF upload endpoint
app.post('/api/upload-pdf', uploadPdf.single('file'), (req, res) => {
  try {
    if (!req.file) {
      console.error('No file received in upload');
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
        details: {
          receivedFiles: !!req.file,
          headers: req.headers,
          body: req.body
        }
      });
    }

    console.log('File successfully uploaded to:', req.file.path);
    
    res.json({
      success: true,
      url: `/pdfs/${req.file.filename}`,
      fileDetails: {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload processing error:', error);
    
    // Clean up failed upload
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to clean up file:', err);
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during upload',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Mount routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const certificateRoutes = require('./routes/certificateRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/certificates', certificateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    uploadDirectories: uploadDirs.map(dir => ({
      path: dir,
      exists: fs.existsSync(dir),
      writable: (() => {
        try {
          fs.accessSync(dir, fs.constants.W_OK);
          return true;
        } catch {
          return false;
        }
      })()
    }))
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: 'File upload error',
      message: err.message,
      code: err.code,
      field: err.field,
      storageErrors: err.storageErrors
    });
  }
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('Upload directories verified:');
  uploadDirs.forEach(dir => {
    console.log(`- ${dir}: ${fs.existsSync(dir) ? 'Exists' : 'Missing'}`);
  });
});