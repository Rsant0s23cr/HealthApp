import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import NutritionChart from "@/components/charts/nutrition-chart";
import html2canvas from "html2canvas";

export default function FoodAnalysis() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  async function handleImageCapture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      analyzeFoodImage();
    };
    reader.readAsDataURL(file);
  }

  async function analyzeFoodImage() {
    setAnalyzing(true);
    // Simulated analysis - in real app would call Vision AI API
    setTimeout(() => {
      setNutritionData({
        calories: 350,
        protein: 20,
        carbs: 45,
        fat: 12,
      });
      setAnalyzing(false);
    }, 1500);
  }

  async function exportAnalysis() {
    const element = document.getElementById("analysis-content");
    if (!element) return;

    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = "analise-nutricional.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Alimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  id="camera"
                  className="hidden"
                  onChange={handleImageCapture}
                />
                <label htmlFor="camera">
                  <Button className="w-full" asChild>
                    <span>
                      <Camera className="mr-2 h-4 w-4" />
                      Capturar Foto do Alimento
                    </span>
                  </Button>
                </label>
              </div>

              {imageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Alimento capturado"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {nutritionData && (
              <div id="analysis-content">
                <NutritionChart
                  protein={nutritionData.protein}
                  carbs={nutritionData.carbs}
                  fat={nutritionData.fat}
                />
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Informação Nutricional</h3>
                  <p>Calorias: {nutritionData.calories}kcal</p>
                  <p>Proteínas: {nutritionData.protein}g</p>
                  <p>Carboidratos: {nutritionData.carbs}g</p>
                  <p>Gorduras: {nutritionData.fat}g</p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={exportAnalysis}
                >
                  Exportar Análise
                </Button>
              </div>
            )}

            {analyzing && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}