import { Home, Book, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Home" },
  { icon: Book, label: "Learn" },
  { icon: Trophy, label: "Achievements" },
  { icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
    >
      <nav className="flex justify-around p-2">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex flex-col items-center p-2 min-w-[64px]",
              "text-sm text-gray-600 hover:text-[#FF6B6B]",
              "transition-colors duration-200"
            )}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </motion.div>
  );
}
