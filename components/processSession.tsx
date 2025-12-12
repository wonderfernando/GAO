import Image from "next/image";
import Link from "next/link";
import React from "react";
import ilustrationForCompany from "../public/assets/img/for-companies.svg";
import ilustration from "../public/assets/img/for-process.svg";

const ProcessSession: React.FC = () => {
  return (
    <>
      <section className="bg-white p-24 py-12 px-6 lg:px-24 ">
        <div className="text-center mb-12 pt-12 text-3xl font-bold text-gray-800">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Como funciona o nosso processo para profissionais
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="flex flex-col space-y-8 lg:w-1/2">
            {/* Etapa 1 */}
            <div className="flex flex-col items-start text-left">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <img
                  src="https://assets.jobartis.com/assets/new/icons/job-green-8e822566731098d1cc3d95d331be92e89e435ccfbfa85e26cfe5eca1ef87c27d.png"
                  alt="Crie um perfil"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Crie um perfil
              </h3>
              <p className="text-gray-600 mt-2">
                Indique quais são as suas experiências e expectativas.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <img
                  src="https://assets.jobartis.com/assets/new/icons/job-red-572511c09ebf5218c1b75a74140a894664ac827b26944dc35facbb49e0fd7eec.png"
                  alt="Alertas de emprego"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Receba propostas de prestação serviço
              </h3>
              <p className="text-gray-600 mt-2">
                Receba emails com as ofertas mais destacadas para você.
              </p>
            </div>
            <div className="mt-12 text-center lg:text-left">
              <Link href={"/register"}>
                <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                  Comece agora
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
            <Image
              src={ilustration}
              alt="Job Illustration"
              className="w-full h-full  "
            />
          </div>
        </div>

        {/* Etapa 2 */}
      </section>

      <section className="bg-blue-600 py-12 px-6 lg:px-24 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">
            Como funciona o nosso processo para empresas
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
            <Image
              src={ilustrationForCompany}
              alt="Job Illustration"
              className="w-full h-full  "
            />
          </div>
          <div className="flex flex-col space-y-8 lg:w-1/2">
            {/* Etapa 1 */}
            <div className="flex flex-col items-start text-left">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <img
                  src="https://assets.jobartis.com/assets/new/icons/job-green-8e822566731098d1cc3d95d331be92e89e435ccfbfa85e26cfe5eca1ef87c27d.png"
                  alt="Crie um perfil"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Crie um perfil
              </h3>
              <p className="text-gray-200 mt-2">
                Indique quais são as suas experiências e expectativas.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <img
                  src="https://assets.jobartis.com/assets/new/icons/job-red-572511c09ebf5218c1b75a74140a894664ac827b26944dc35facbb49e0fd7eec.png"
                  alt="Alertas de emprego"
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Receba propostas de prestação serviço
              </h3>
              <p className="text-gray-200 mt-2">
                Receba emails com as ofertas mais destacadas para você.
              </p>
            </div>
            <div className="mt-12 text-center lg:text-left">
              <Link href={"/register"}>
                <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300">
                  Comece agora
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessSession;
