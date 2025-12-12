"use client";

import AssinaturaModal from "@/components/AssinaturaModal";
import type { AssinaturaGuardProps } from "@/types";
import { useState } from "react";

export default function AssinaturaGuard({
  hasPlano,
  children,
}: AssinaturaGuardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!hasPlano) {
      e.preventDefault(); // impede navegação normal
      setShowModal(false); // abre o modal
    }
  };

  return (
    <>
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>

      {showModal && <AssinaturaModal onClose={() => setShowModal(false)} />}
    </>
  );
}
