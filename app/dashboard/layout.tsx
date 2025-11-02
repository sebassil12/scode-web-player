// En: src/app/dashboard/layout.tsx

import React from "react";

// Puedes exportar 'metadata' por separado
export const metadata = {
  title: "Mi Dashboard",
};

// PERO, DEBES tener una exportación default
// que sea un componente de React y reciba "children"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Aquí puedes añadir un header o sidebar específico del dashboard */}
      <nav>Sidebar del Dashboard</nav>

      {/* La prop "children" es obligatoria. 
          Aquí es donde se renderizará tu `page.tsx` */}
      {children}
    </section>
  );
}
