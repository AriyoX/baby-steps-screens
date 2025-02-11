import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/bottom-nav";
import { motion } from "framer-motion";

interface ModuleCard {
  title: string;
  icon: string;
  link: string;
}

const modules: ModuleCard[] = [
  {
    title: "Learn Buganda Culture",
    icon: "📚",
    link: "/learn/culture"
  },
  {
    title: "Virtual Museum",
    icon: "🏛️",
    link: "/learn/museum"
  },
  {
    title: "Fun Stories",
    icon: "📖",
    link: "/learn/stories"
  },
  {
    title: "Play Games",
    icon: "🎮",
    link: "/learn/games"
  },
  {
    title: "My Badges",
    icon: "🏅",
    link: "/learn/badges"
  },
  {
    title: "Achievements",
    icon: "🏆",
    link: "/learn/achievements"
  }
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {modules.map((module) => (
              <Card key={module.title} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
                    {module.icon}
                  </div>
                  <h3 className="font-medium text-gray-900">{module.title}</h3>
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
