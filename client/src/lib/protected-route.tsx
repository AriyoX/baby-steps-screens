import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen bg-[#F7F9FC]">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF6B6B]" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  // Redirect to appropriate dashboard based on user type
  if (path === "/" && user) {
    return (
      <Route path={path}>
        <Redirect to={user.isParent ? "/parent" : "/child"} />
      </Route>
    );
  }

  // Check if user has access to the requested route
  if (
    (path === "/parent" && !user.isParent) ||
    (path === "/child" && user.isParent)
  ) {
    return (
      <Route path={path}>
        <Redirect to={user.isParent ? "/parent" : "/child"} />
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}
