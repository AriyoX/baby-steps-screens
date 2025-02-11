import { useAuth } from "@/hooks/use-auth";
import { BottomNav } from "@/components/bottom-nav";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Achievement } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

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
              <h2 className="text-xl font-bold mb-4">Welcome back, {user?.displayName}!</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF6B6B]">5</div>
                  <div className="text-sm text-gray-600">Lessons Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4ECDC4]">3</div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Continue Learning</h3>
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-[#FFE66D] rounded-lg mb-4" />
                <h4 className="font-medium">Virtual Museum Tour</h4>
                <p className="text-sm text-gray-600">Learn about dinosaurs!</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
