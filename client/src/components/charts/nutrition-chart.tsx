import { Card } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface NutritionChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

export default function NutritionChart({ protein, carbs, fat }: NutritionChartProps) {
  const data = [
    { name: "Proteínas", value: protein },
    { name: "Carboidratos", value: carbs },
    { name: "Gorduras", value: fat },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

  return (
    <Card className="p-4 h-[300px]">
      <h3 className="text-lg font-semibold mb-4">Distribuição Nutricional</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}