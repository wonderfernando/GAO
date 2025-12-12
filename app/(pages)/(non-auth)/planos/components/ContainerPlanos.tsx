import CardPlano from "@/components/ui/card-plano";
import { planosData } from "../data";

export default function ContainerPlanos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-300 drop-shadow-lg">
          Planos de Subscrição
        </h1>
        <p className="text-lg text-blue-200 mb-8">
          Escolha o plano que melhor se adapta às suas necessidades.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {planosData.map((plano, idx) => (
          <CardPlano key={idx} {...plano} destaque={idx === 1} />
        ))}
      </div>
    </div>
  );
}
