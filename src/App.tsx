import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index.tsx";
import Modules from "./pages/Modules.tsx";
import ModuleDetail from "./pages/ModuleDetail.tsx";
import Operations from "./pages/Operations.tsx";
import TriageFlow from "./pages/TriageFlow.tsx";
import SmartTriage from "./pages/SmartTriage.tsx";
import LawnId from "./pages/LawnId.tsx";
import LawnIdDetail from "./pages/LawnIdDetail.tsx";
import Policies from "./pages/Policies.tsx";
import PolicyDetail from "./pages/PolicyDetail.tsx";
import Scheduling from "./pages/Scheduling.tsx";
import HowTo from "./pages/HowTo.tsx";
import HowToDetail from "./pages/HowToDetail.tsx";
import AccountFlags from "./pages/AccountFlags.tsx";
import ConditionCodes from "./pages/ConditionCodes.tsx";
import Terms from "./pages/Terms.tsx";
import Dev from "./pages/Dev.tsx";
import WelcomePack from "./pages/WelcomePack.tsx";
import Login from "./pages/Login.tsx";
import Admin from "./pages/Admin.tsx";
import Suppliers from "./pages/Suppliers.tsx";
import SeasonalCalendar from "./pages/SeasonalCalendar.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function ProtectedLayout() {
  const { session, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
  if (!session) return <Navigate to="/login" replace />;
  return <Layout><Outlet /></Layout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/intranet">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/modules/:moduleId" element={<ModuleDetail />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/operations/smart-triage" element={<SmartTriage />} />
              <Route path="/operations/triage/:flowId" element={<TriageFlow />} />
              <Route path="/lawn-id" element={<LawnId />} />
              <Route path="/lawn-id/:entryId" element={<LawnIdDetail />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/policies/:policyId" element={<PolicyDetail />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/how-to" element={<HowTo />} />
              <Route path="/how-to/:guideId" element={<HowToDetail />} />
              <Route path="/account-flags" element={<AccountFlags />} />
              <Route path="/condition-codes" element={<ConditionCodes />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/dev" element={<Dev />} />
              <Route path="/welcome" element={<WelcomePack />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
