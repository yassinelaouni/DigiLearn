import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import features from './features';
import layout from './layout';
import store from "./store";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CertificationTest from "./pages/CertificationTest";
import CertificationResults from "./pages/CertificationResults";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ChatbotButton } from './components/ChatbotButton';


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
            <Route path="/about" element={<About />} />

            {/* Admin Dashboard Routes */}
            <Route path="/adminDashboard" element={<layout.adminDashboard />}>
              <Route index element={<Navigate to="app" replace />} />
              <Route path="app" element={<features.admin.useCases.Dashboard />} />
              <Route path="profile" element={<features.admin.useCases.Profile />} />
              <Route path="payments" element={<features.payments.useCases.PaymentList.Main />} />
              <Route path="users" element={<features.users.useCases.userList.Main />} />
              <Route path="users/detailed" element={<features.users.useCases.userList.Detailed />} />
            </Route>

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<layout.dashboard />}>
              <Route path="profile" element={<features.users.useCases.Profile />} />
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