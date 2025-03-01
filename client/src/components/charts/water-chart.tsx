import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WaterChartProps {
  current: number;
  target: number;
}

export default function WaterChart({ current, target }: WaterChartProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Consumo de Água</h3>
        <span className="text-sm text-muted-foreground">
          {current}ml / {target}ml
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
      <p className="mt-4 text-sm text-muted-foreground">
        {percentage < 100
          ? `Faltam ${Math.round(target - current)}ml`
          : "Meta diária alcançada!"}
      </p>
    </Card>
  );
}