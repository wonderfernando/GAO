// app/(public)/planos/page.tsx
"use client";

import Header from "@/components/header";
import CardPlano from "@/components/ui/card-plano";
import { planosData } from "./data";
import ContainerPlanos from "./components/ContainerPlanos";

export default function PlanosPage() {
  return (
    <>
      <Header />
      <ContainerPlanos />
    </>
  );
}
