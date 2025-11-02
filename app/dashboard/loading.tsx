// En: src/app/dashboard/loading.tsx

import { Loader2 } from "lucide-react"; // Un ícono de spinner popular

/**
 * Este es el componente que Next.js renderizará
 * mientras la página /dashboard/page.tsx está obteniendo sus datos.
 */
export default function Loading() {
  // Debe ser un 'export default' de un componente de React
  return (
    // Usamos Tailwind para centrar el spinner.
    // 'p-24' coincide con el padding de tus otras páginas.
    <div className="flex h-full items-center justify-center p-24">
      {/* 'animate-spin' es una utilidad de Tailwind */}
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
