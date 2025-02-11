import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { User } from "@shared/schema";

export default function ParentDashboard() {
  const { user, logoutMutation } = useAuth();
  const { data: children } = useQuery<User[]>({
    queryKey: ["/api/children"],
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2D3436]">Parent Dashboard</h1>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {children?.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle>{child.displayName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Daily Progress</div>
                    <Progress value={45} />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Achievements</div>
                    <div className="flex gap-2">
                      {/* Achievement badges would go here */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex items-center justify-center p-8">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Child Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
