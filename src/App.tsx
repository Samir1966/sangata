
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { AuthProvider } from "./context/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load page components for better performance
const ChatPage = lazy(() => import("./pages/ChatPage"));
const CalculatorsPage = lazy(() => import("./pages/CalculatorsPage"));
const PrescriptionPage = lazy(() => import("./pages/PrescriptionPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProfileCompletionPage = lazy(() => import("./pages/ProfileCompletionPage"));
const ProfileEditPage = lazy(() => import("./pages/ProfileEditPage"));
const MentalHealthPage = lazy(() => import("./pages/MentalHealthPage"));
const PCOSTrackerPage = lazy(() => import("./pages/PCOSTrackerPage"));
const MenopauseTrackerPage = lazy(() => import("./pages/MenopauseTrackerPage"));
const BreastHealthPage = lazy(() => import("./pages/BreastHealthPage"));
const AnemiaRiskPage = lazy(() => import("./pages/AnemiaRiskPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

// Lazy load solution pages
const EmotionalHealthPage = lazy(() => import("./pages/solutions/EmotionalHealthPage"));
const NutritionPage = lazy(() => import("./pages/solutions/NutritionPage"));
const PeriodTrackerPage = lazy(() => import("./pages/solutions/PeriodTrackerPage"));
const PregnancyCheckerPage = lazy(() => import("./pages/solutions/PregnancyCheckerPage"));
const BabyGrowthPage = lazy(() => import("./pages/solutions/BabyGrowthPage"));
const PlateScanner = lazy(() => import("./pages/solutions/PlateScanner"));
const SymptomVisualizerPage = lazy(() => import("./pages/solutions/SymptomVisualizerPage"));
const HerbalRemediesPage = lazy(() => import("./pages/solutions/HerbalRemediesPage"));
const DoctorNotesPage = lazy(() => import("./pages/solutions/DoctorNotesPage"));
const MedicineReminderPage = lazy(() => import("./pages/solutions/MedicineReminderPage"));
const SolutionsListPage = lazy(() => import("./pages/solutions/SolutionsListPage"));

const App = () => {
  // Create a client instance inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/calculators" element={<CalculatorsPage />} />
                <Route path="/prescription" element={<PrescriptionPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/complete" element={<ProfileCompletionPage />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
                <Route path="/mental-health" element={<MentalHealthPage />} />
                <Route path="/pcos-tracker" element={<PCOSTrackerPage />} />
                <Route path="/menopause-tracker" element={<MenopauseTrackerPage />} />
                <Route path="/breast-health" element={<BreastHealthPage />} />
                <Route path="/anemia-risk" element={<AnemiaRiskPage />} />
                <Route path="/admin" element={<AdminPage />} />
                
                {/* Solution Routes */}
                <Route path="/solutions" element={<SolutionsListPage />} />
                <Route path="/solutions/emotional-health" element={<EmotionalHealthPage />} />
                <Route path="/solutions/nutrition" element={<NutritionPage />} />
                <Route path="/solutions/period-tracker" element={<PeriodTrackerPage />} />
                <Route path="/solutions/pregnancy-checker" element={<PregnancyCheckerPage />} />
                <Route path="/solutions/baby-growth" element={<BabyGrowthPage />} />
                <Route path="/solutions/plate-scanner" element={<PlateScanner />} />
                <Route path="/solutions/symptom-visualizer" element={<SymptomVisualizerPage />} />
                <Route path="/solutions/herbal-remedies" element={<HerbalRemediesPage />} />
                <Route path="/solutions/doctor-notes" element={<DoctorNotesPage />} />
                <Route path="/solutions/medicine-reminder" element={<MedicineReminderPage />} />
                <Route path="/solutions/more" element={<SolutionsListPage />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
