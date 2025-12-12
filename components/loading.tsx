import Image from "next/image";

export default function Loading() {
  return (
    <p className="text-gray-500 animate-pulse flex flex-col items-center">
      <Image
        src="/assets/img/loading/loading1.gif"
        alt="Carregando..."
        width={48}
        height={48}
        className="mx-auto "
      />
    </p>
  );
}
