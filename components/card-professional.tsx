"use client";
import React from "react";
import Image from "next/image";

interface ProfessionalCardProps {
  name: string;
  profession: string;
  services: string[];
  pricePerHour: number;
  photo?: string;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  name,
  profession,
  services,
  pricePerHour,
  photo,
}) => {
  return (
    <div className="bg-white rounded-xl hover:shadow-lg transition p-4 flex gap-4">
      {/* Foto */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          {photo ? (
            <Image
              src={photo}
              alt={name}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">Sem Foto</span>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{profession}</p>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {services.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preço */}
        <div className="mt-3">
          <span className="text-sm text-gray-600">Preço/Hora:</span>{" "}
          <span className="text-base font-bold text-green-600">
            {pricePerHour.toLocaleString("pt-AO", {
              style: "currency",
              currency: "AOA",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
