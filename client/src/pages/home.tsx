import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Camera, Droplets } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Calculator,
      title: "Calculadora IMC",
      description: "Calcule seu Índice de Massa Corporal e receba recomendações personalizadas",
      href: "/bmi"
    },
    {
      icon: Camera,
      title: "Análise de Alimentos",
      description: "Analise suas refeições através de fotos para acompanhar o conteúdo nutricional",
      href: "/food-analysis"
    },
    {
      icon: Droplets,
      title: "Controle de Água",
      description: "Monitore sua ingestão diária de água e mantenha-se hidratado",
      href: "/water-tracking"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Acompanhe sua Jornada de Saúde
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Monitore seu IMC, analise suas refeições e controle a ingestão de água - tudo em um só lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, description, href }) => (
          <Card key={href} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-4">
                <Icon className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-muted-foreground mb-6">{description}</p>
              <Link href={href}>
                <Button className="w-full py-6 text-lg">Começar</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}