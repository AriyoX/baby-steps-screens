import { useAuth } from "@/hooks/use-auth";
import { BottomNav } from "@/components/bottom-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Award, Gamepad, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logoutMutation } = useAuth();

  const stats = [
    { icon: Star, label: "Total XP", value: "350" },
    { icon: Award, label: "Badges", value: "3" },
    { icon: Gamepad, label: "Games Won", value: "5" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-16">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          {/* Profile Header */}
          <Card className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] text-white">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt="avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : "👋"}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{user?.displayName}</h1>
              <p className="text-white/80">Level 3 Explorer</p>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <Card key={label} className="bg-white">
                <CardContent className="p-4 text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-[#FF6B6B]" />
                  <div className="text-xl font-bold text-[#2D3436]">{value}</div>
                  <div className="text-xs text-gray-600">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFE66D] flex items-center justify-center">
                    🎨
                  </div>
                  <div>
                    <p className="font-medium">Completed Art Activity</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4ECDC4] flex items-center justify-center">
                    🏛️
                  </div>
                  <div>
                    <p className="font-medium">Visited Virtual Museum</p>
                    <p className="text-sm text-gray-600">5 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
