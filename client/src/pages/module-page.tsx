import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/bottom-nav";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

interface ModulePageProps {
  title: string;
  description: string;
  icon: string;
}

export default function ModulePage({ title, description, icon }: ModulePageProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          <Button 
            variant="ghost" 
            className="w-fit"
            onClick={() => setLocation("/learn")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{icon}</span>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>

          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600">{description}</p>
              {/* Content specific to each module will go here */}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
