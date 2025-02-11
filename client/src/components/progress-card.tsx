import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressCard({ 
  title, 
  current, 
  total 
}: { 
  title: string;
  current: number;
  total: number;
}) {
  const percentage = (current / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="mb-2" />
        <div className="text-sm text-gray-600">
          {current} of {total} complete
        </div>
      </CardContent>
    </Card>
  );
}
