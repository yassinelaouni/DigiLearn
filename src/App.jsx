import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const App = () => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <div className="app">
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
              <Route index element={<Navigate to="app" replace />} />
              <Route path="app" element={<features.admin.useCases.Dashboard />} />
              <Route path="users" element={<features.admin.useCases.UserManagement />} />
              <Route path="courses" element={<features.admin.useCases.CourseManagement />} />
              <Route path="certificates" element={<features.admin.useCases.CertificateManagement />} />
            </Route>

            {/* Catch-all Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

export default App;