import { Home, Book, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

const items = [
  { icon: Home, label: "Home", path: "/child" },
  { icon: Book, label: "Learn", path: "/learn" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
    >
      <nav className="flex justify-around p-2">
        {items.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => setLocation(path)}
            className={cn(
              "flex flex-col items-center p-2 min-w-[64px]",
              "text-sm hover:text-[#FF6B6B]",
              "transition-colors duration-200",
              location === path ? "text-[#FF6B6B]" : "text-gray-600"
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