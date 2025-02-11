import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { User, Achievement, Progress as UserProgress } from "@shared/schema";
import { useLocation } from "wouter";

export default function ChildDetails() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const childId = window.location.pathname.split('/')[2];

  const { data: children } = useQuery<User[]>({
    queryKey: ["/api/children"],
  });

  const childUser = children?.find(child => child.id.toString() === childId);

  if (!childUser) {
    return <div>Child not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setLocation("/parent")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-[#2D3436]">
            {childUser.displayName}'s Progress
          </h1>
        </div>

        <div className="grid gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium mb-2">Daily Goals</div>
                  <Progress value={45} className="bg-gray-100" />
                  <p className="text-sm text-gray-600 mt-2">
                    45% of daily learning goals completed
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Weekly Activity</div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded bg-[#4ECDC4] bg-opacity-20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Mock achievements */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border bg-gray-50 text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#FFE66D] flex items-center justify-center">
                      🌟
                    </div>
                    <div className="text-sm font-medium">Achievement {i + 1}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
