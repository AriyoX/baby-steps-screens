import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import ParentDashboard from "@/pages/parent-dashboard";
import ChildDashboard from "@/pages/child-dashboard";
import ChildDetails from "@/pages/child-details";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/">
        {(params) => {
          const { user } = useAuth();
          if (!user) return <Redirect to="/auth" />;
          return <Redirect to={user.isParent ? "/parent" : "/child"} />;
        }}
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/parent" component={ParentDashboard} />
      <Route path="/child" component={ChildDashboard} />
      <Route path="/child/:id" component={ChildDashboard} />
      <Route path="/child/:id/details" component={ChildDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;