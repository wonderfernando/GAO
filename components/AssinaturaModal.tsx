"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

export default function AssinaturaModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleVerPlanos = () => {
    onClose();
    router.push("/planos");
  };

  return (
    <Dialog open={true} onOpenChange={() => false}>
      <DialogOverlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <DialogContent className="max-w-md rounded-2xl shadow-lg border bg-white p-6">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Crown className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold">
            Recurso Premium
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-gray-600 mt-2">
          Para continuar usando esta funcionalidade, você precisa assinar um dos
          nossos planos.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleVerPlanos}
          >
            Ver Planos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
