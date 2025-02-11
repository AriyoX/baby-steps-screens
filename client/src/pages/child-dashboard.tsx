import { useAuth } from "@/hooks/use-auth";
import { BottomNav } from "@/components/bottom-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Achievement } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Flame, BookOpen } from "lucide-react";

export default function ChildDashboard() {
  const { user } = useAuth();
  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Welcome back, {user?.displayName}!</h2>
                <div className="flex items-center text-orange-500">
                  <Flame className="w-5 h-5 mr-1" />
                  <span className="font-bold">5 Day Streak!</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6B6B]">350</div>
                  <div className="text-sm text-gray-600">XP Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4ECDC4]">5</div>
                  <div className="text-sm text-gray-600">Lessons Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFE66D]">3</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Level Progress</span>
                    <span className="text-gray-600">350/500 XP</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Continue Learning</h3>
              <BookOpen className="w-5 h-5 text-gray-500" />
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-[#FFE66D] rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">🏛️</span>
                  </div>
                </div>
                <h4 className="font-medium">Virtual Museum Tour</h4>
                <p className="text-sm text-gray-600">Explore Buganda artifacts!</p>
                <Progress value={30} className="mt-4" />
                <p className="text-xs text-gray-500 mt-2">30% completed</p>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center mt-4">
              <h3 className="text-lg font-semibold">Recent Achievements</h3>
              <Trophy className="w-5 h-5 text-gray-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((_, i) => (
                <Card key={i} className="bg-gradient-to-br from-[#FFE66D] to-[#FFD43B]">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">{i === 0 ? "🎨" : "📚"}</span>
                    </div>
                    <h4 className="font-medium text-sm">
                      {i === 0 ? "Creative Explorer" : "Knowledge Seeker"}
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}