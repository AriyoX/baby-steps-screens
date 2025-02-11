import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { User } from "@shared/schema";
import { AddChildDialog } from "@/components/add-child-dialog";

export default function ParentDashboard() {
  const { user, logoutMutation } = useAuth();
  const { data: children } = useQuery<User[]>({
    queryKey: ["/api/children"],
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#2D3436]">Parent Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.displayName}</p>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {children?.map((child) => (
            <Card key={child.id} className="bg-white">
              <CardHeader>
                <CardTitle>{child.displayName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Daily Progress</div>
                    <Progress value={45} className="bg-gray-100" />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Recent Activity</div>
                    <div className="text-sm text-gray-600">
                      Completed 2 lessons today
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex items-center justify-center p-8 bg-white">
            <AddChildDialog />
          </Card>
        </div>
      </div>
    </div>
  );
}