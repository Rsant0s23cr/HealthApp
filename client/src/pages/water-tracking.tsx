import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import WaterChart from "@/components/charts/water-chart";

const PORTION_SIZE = 250; // ml
const TARGET_INTAKE = 2500; // ml

export default function WaterTracking() {
  const [currentIntake, setCurrentIntake] = useState(0);

  function addWater() {
    setCurrentIntake(prev => Math.min(prev + PORTION_SIZE, TARGET_INTAKE));
  }

  function removeWater() {
    setCurrentIntake(prev => Math.max(prev - PORTION_SIZE, 0));
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Controle de Água</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <WaterChart current={currentIntake} target={TARGET_INTAKE} />

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={removeWater}
              disabled={currentIntake === 0}
              className="py-6 text-lg w-full sm:w-auto min-w-[200px]"
            >
              <Minus className="h-5 w-5 mr-2" />
              Remover {PORTION_SIZE}ml
            </Button>
            <Button
              size="lg"
              onClick={addWater}
              disabled={currentIntake >= TARGET_INTAKE}
              className="py-6 text-lg w-full sm:w-auto min-w-[200px]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Adicionar {PORTION_SIZE}ml
            </Button>
          </div>

          <div className="mt-6 text-center bg-muted rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Dicas para se Manter Hidratado</h3>
            <ul className="text-base text-muted-foreground space-y-3">
              <li>Beba um copo de água em cada refeição</li>
              <li>Mantenha uma garrafa de água em sua mesa</li>
              <li>Configure lembretes ao longo do dia</li>
              <li>Beba água antes, durante e depois dos exercícios</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}