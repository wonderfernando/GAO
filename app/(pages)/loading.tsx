import Image from "next/image";
import React from "react";
import loading from "@/public/assets/img/loading.gif";
const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="bg-white "
    >
      <Image src={loading} alt="loading"></Image>
      <p>Carregando dados...</p>
    </div>
  );
};

export default Loading;
