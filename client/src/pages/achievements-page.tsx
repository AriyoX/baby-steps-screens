import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Achievement } from "@shared/schema";

export default function AchievementsPage() {
  const { data: achievements } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const badges = [
    {
      title: "Creative Explorer",
      description: "Completed first cultural activity",
      icon: "🎨",
      color: "from-[#FFE66D] to-[#FFD43B]"
    },
    {
      title: "Knowledge Seeker",
      description: "Finished 5 learning modules",
      icon: "📚",
      color: "from-[#4ECDC4] to-[#45B7AF]"
    },
    {
      title: "Museum Expert",
      description: "Explored all virtual exhibits",
      icon: "🏛️",
      color: "from-[#FF6B6B] to-[#EE5253]"
    },
    {
      title: "Story Master",
      description: "Read 10 cultural stories",
      icon: "📖",
      color: "from-[#A8E6CF] to-[#8CD3B3]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Achievements</h1>
            <Trophy className="w-6 h-6 text-[#FFD43B]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <Card key={index} className={`bg-gradient-to-br ${badge.color}`}>
                <CardContent className="p-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl">{badge.icon}</span>
                  </div>
                  <h3 className="font-semibold text-center mb-1">{badge.title}</h3>
                  <p className="text-sm text-center text-gray-700">
                    {badge.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
