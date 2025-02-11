import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

export function ProgressCard({ 
  title, 
  current, 
  total,
  icon = "📚",
  color = "bg-blue-500" 
}: { 
  title: string;
  current: number;
  total: number;
  icon?: string;
  color?: string;
}) {
  const percentage = (current / total) * 100;

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            {title}
          </CardTitle>
          {percentage === 100 && (
            <Trophy className="w-5 h-5 text-yellow-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className={`h-2 ${color}`} />
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-600">
            {current} of {total} complete
          </div>
          <div className="text-sm font-medium">
            {percentage}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}