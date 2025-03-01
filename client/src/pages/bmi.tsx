import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const bmiSchema = z.object({
  height: z.string().transform(Number).pipe(z.number().positive()),
  weight: z.string().transform(Number).pipe(z.number().positive()),
});

type BmiFormValues = z.infer<typeof bmiSchema>;

export default function BMI() {
  const [bmi, setBmi] = useState<number | null>(null);

  const form = useForm<BmiFormValues>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      height: "",
      weight: "",
    },
  });

  function calculateBMI(values: BmiFormValues) {
    const heightInMeters = values.height / 100;
    const bmi = values.weight / (heightInMeters * heightInMeters);
    setBmi(Math.round(bmi * 10) / 10);
  }

  function getBMICategory(bmi: number) {
    if (bmi < 18.5) return "Abaixo do peso";
    if (bmi < 25) return "Peso normal";
    if (bmi < 30) return "Sobrepeso";
    return "Obesidade";
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de IMC</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(calculateBMI)} className="space-y-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="175" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="70" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Calcular IMC</Button>
            </form>
          </Form>

          {bmi && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Seus Resultados</h3>
              <p className="text-3xl font-bold text-primary mb-2">{bmi}</p>
              <p className="text-muted-foreground">
                Categoria: {getBMICategory(bmi)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}