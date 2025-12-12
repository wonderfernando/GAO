"use client";
import React from "react";
import ProfessionalCard from "./card-professional";

const professionals = [
  {
    name: "João Silva",
    profession: "Eletricista",
    services: ["Instalação", "Reparação", "Manutenção"],
    pricePerHour: 5000,
    photo: "/images/profissionais/joao.jpg",
  },
  {
    name: "Maria Fernandes",
    profession: "Designer Gráfico",
    services: ["Logotipos", "Branding", "Social Media"],
    pricePerHour: 8000,
    photo: "/images/profissionais/maria.jpg",
  },
  {
    name: "Carlos Domingos",
    profession: "Programador Web",
    services: ["Sites", "APIs", "E-commerce"],
    pricePerHour: 10000,
    photo: "/images/profissionais/carlos.jpg",
  },
];

const ProfessionalList = () => {
  return (
    <div className="space-y-4">
      {professionals.map((pro, idx) => (
        <ProfessionalCard key={idx} {...pro} />
      ))}
    </div>
  );
};

export default ProfessionalList;
