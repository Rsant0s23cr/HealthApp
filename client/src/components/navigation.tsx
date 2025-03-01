import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Calculator, Camera, Droplets } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/bmi", label: "Calculadora IMC", icon: Calculator },
    { href: "/food-analysis", label: "Análise de Alimentos", icon: Camera },
    { href: "/water-tracking", label: "Controle de Água", icon: Droplets },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between flex-wrap">
          <Link href="/">
            <a className="text-xl md:text-2xl font-bold text-primary">SaúdeTrack</a>
          </Link>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 py-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <a className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
                  location === href 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:bg-muted"
                )}>
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{label}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}