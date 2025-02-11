import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Achievement } from "@shared/schema";

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <img
            src={achievement.imageUrl}
            alt={achievement.title}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
