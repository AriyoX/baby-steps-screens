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
import LearnPage from "@/pages/learn-page";
import AchievementsPage from "@/pages/achievements-page";
import ModulePage from "@/pages/module-page";
import ProfilePage from "@/pages/profile-page"; // Added import
import BugandaCulture from "@/pages/learn/culture";
import VirtualMuseum from "@/pages/learn/museum";
import Games from "@/pages/learn/games";

const modulePages = {
  culture: {
    title: "Learn Buganda Culture",
    description: "Explore the rich traditions and customs of Buganda culture through interactive lessons.",
    icon: "📚"
  },
  museum: {
    title: "Virtual Museum",
    description: "Take a virtual tour through historical artifacts and cultural exhibitions.",
    icon: "🏛️"
  },
  stories: {
    title: "Fun Stories",
    description: "Read and listen to engaging stories from Buganda folklore and history.",
    icon: "📖"
  },
  games: {
    title: "Play Games",
    description: "Learn while having fun with educational games based on Buganda culture.",
    icon: "🎮"
  }
};

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
      <Route path="/learn" component={LearnPage} />
      <Route path="/learn/culture" component={BugandaCulture} />
      <Route path="/learn/museum" component={VirtualMuseum} />
      <Route path="/learn/games" component={Games} />
      <Route path="/achievements" component={AchievementsPage} />
      <Route path="/profile" component={ProfilePage} /> {/* Added route */}

      {/* Learning module routes */}
      {Object.entries(modulePages).map(([key, props]) => (
        <Route 
          key={key}
          path={`/learn/${key}`}
          component={() => <ModulePage {...props} />}
        />
      ))}

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