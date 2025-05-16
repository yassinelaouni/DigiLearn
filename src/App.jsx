import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import features from './features';
import Layout from "@/components/layout/AdminLayout";
import store from "./store";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CertificationTest from "./pages/CertificationTest";
import CertificationResults from "./pages/CertificationResults";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ChatbotButton } from './components/ChatbotButton';
import UserDashboard from "./pages/Dashboard";
import CertificateDetail from "./pages/CertificateDetail";
import Certificates from "./pages/Certificates";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();

  // List of paths where ChatbotButton should be hidden
  const hiddenPaths = [
    '/adminDashboard',
    '/adminDashboard/users',
    '/adminDashboard/courses',
    '/adminDashboard/certificates',
    '/adminDashboard/settings',
    '/login',
    '/admin',
    '/signup',
    /^\/courses\/.+\/certification$/ // matches /courses/:slug/certification
  ];

  // Check if current path should hide the ChatbotButton
  const shouldShowChatbot = !hiddenPaths.some(path => {
    if (typeof path === 'string') {
      return location.pathname.startsWith(path);
    } else if (path instanceof RegExp) {
      return path.test(location.pathname);
    }
    return false;
  });

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<features.auth.useCases.Login />} />
        <Route path="/admin" element={<features.auth.useCases.Login />} />
        <Route path="/signup" element={<features.auth.useCases.Register />} />
        <Route path="/profile" element={<features.users.useCases.Profile />} />
        <Route path="/certificate" element={<features.payments.useCases.Certificate />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/courses/:slug/certification" element={<CertificationTest />} />
        <Route path="/courses/:slug/certification/results" element={<CertificationResults />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificates/:id" element={<CertificateDetail />} />
        <Route path="/about" element={<About />} />

        {/* Admin Dashboard Routes */}
        <Route path="/adminDashboard" element={<Layout />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<features.admin.useCases.UserManagement />} />
          <Route path="courses" element={<features.admin.useCases.CourseManagement />} />
          <Route path="certificates" element={<features.admin.useCases.CertificateManagement />} />
          <Route path="settings" element={<features.admin.useCases.Settings />} />
        </Route>

        {/* Catch-all Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowChatbot && <ChatbotButton />}
    </>
  );
};

const App = () => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="app">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

export default App;