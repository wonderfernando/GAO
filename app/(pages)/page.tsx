"use client";

import {
  ArrowRight,
  Building2,
  UserPlus,
  MessageSquare,
  Briefcase,
  GraduationCap,
  FileText,
  Package,
  TrendingUp,
  Calculator,
  Globe,
  Users,
  BarChart3,
  Smartphone,
  BookOpen,
  DollarSign,
  Target,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Link from "next/link";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section com Imagem de Fundo Corporativa */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/corporate_hero_image_1765494863738.png"
            alt="Ambiente Corporativo Profissional"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/80"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge Corporativo */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium text-white/90">Plataforma Empresarial Líder</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                Conectando
                <br />
                <span className="text-blue-400">Empresas</span> e <span className="text-blue-400">Profissionais</span>
              </h1>

              {/* Subtítulo */}
              <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed max-w-2xl">
                A BusinessWave é a plataforma profissional que une empresas e especialistas qualificados.
                Encontre oportunidades de negócio, ofereça serviços especializados ou acesse soluções empresariais completas.
              </p>

              {/* Botões de Ação - Design Corporativo */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/register?type=professional">
                    <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 h-14 px-8 text-base font-semibold shadow-xl">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Cadastrar como Profissional
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/register?type=company">
                    <Button className="w-full sm:w-auto bg-white text-slate-900 hover:bg-gray-100 h-14 px-8 text-base font-semibold shadow-xl">
                      <Building2 className="mr-2 h-5 w-5" />
                      Cadastrar Empresa
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Estatísticas Corporativas */}
              <div className="flex flex-wrap gap-8 text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">100+</div>
                    <div className="text-sm text-gray-400">Profissionais Ativos</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-gray-400">Empresas Registradas</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">200+</div>
                    <div className="text-sm text-gray-400">Projetos Realizados</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Link de Contato Discreto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-8 right-8 hidden lg:block"
          >
            <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contactar Plataforma
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Como Funciona a Plataforma */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A BusinessWave conecta empresas que precisam de serviços com profissionais qualificados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">1. Cadastre-se</h3>
              <p className="text-gray-600">
                Profissionais e empresas criam seus perfis na plataforma
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">2. Conecte-se</h3>
              <p className="text-gray-600">
                Empresas encontram profissionais e vice-versa através da plataforma
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3. Trabalhe</h3>
              <p className="text-gray-600">
                Realize projetos, ofereça serviços e faça seu negócio crescer
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços Disponíveis na Plataforma */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Serviços Disponíveis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre profissionais e empresas especializadas em diversas áreas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Serviços Profissionais */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Contabilidade</h3>
              <p className="text-sm text-gray-600 mb-3">
                Contadores, auditores e consultores fiscais
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Impostos</span>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Auditoria</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Recursos Humanos</h3>
              <p className="text-sm text-gray-600 mb-3">
                Recrutamento, treinamento e gestão de pessoas
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Recrutamento</span>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">Formação</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Marketing Digital</h3>
              <p className="text-sm text-gray-600 mb-3">
                Gestão de redes sociais, SEO e publicidade
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Social Media</span>
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">SEO</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Consultoria Jurídica</h3>
              <p className="text-sm text-gray-600 mb-3">
                Advogados e consultores legais
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Contratos</span>
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Compliance</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Tecnologia</h3>
              <p className="text-sm text-gray-600 mb-3">
                Desenvolvimento de software e aplicativos
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">Desenvolvimento</span>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">Apps</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Consultoria Estratégica</h3>
              <p className="text-sm text-gray-600 mb-3">
                Planejamento e estratégia empresarial
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">Planos</span>
                <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">Análise</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Formação</h3>
              <p className="text-sm text-gray-600 mb-3">
                Cursos, treinamentos e capacitação
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded">Cursos</span>
                <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded">Workshops</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Logística</h3>
              <p className="text-sm text-gray-600 mb-3">
                Gestão de inventário e distribuição
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Inventário</span>
                <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded">Supply Chain</span>
              </div>
            </motion.div>
          </div>

          {/* CTA para ver mais serviços */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">E muito mais...</p>
            <Link href="/services">
              <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Seção de Serviços Prestados pela Plataforma */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Serviços da Plataforma
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Além de conectar profissionais e empresas, a BusinessWave também oferece serviços especializados
            </p>
          </motion.div>

          {/* Consultoria Empresarial */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-3xl font-bold text-gray-900">Consultoria Empresarial</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200">
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Formação e Desenvolvimento</h4>
                <p className="text-gray-600">Desenvolvimento de pessoal competente e qualificado</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200">
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Criação e Legalização</h4>
                <p className="text-gray-600">Criação, legalização e acompanhamento de empresas</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200">
                <Package className="h-12 w-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Organização Documental</h4>
                <p className="text-gray-600">Gestão e organização de documentos empresariais</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-200">
                <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Inventário</h4>
                <p className="text-gray-600">Controle e gestão de inventário empresarial</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Negócios */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-3xl font-bold text-gray-900">Negócios</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-200">
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Plano Estratégico</h4>
                <p className="text-gray-600">Criação de plano estratégico empresarial</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-200">
                <Calculator className="h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Contabilidade e Finanças</h4>
                <p className="text-gray-600">Organização da contabilidade e finanças</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-200">
                <DollarSign className="h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Orientação Fiscal</h4>
                <p className="text-gray-600">Organização e orientação fiscal (impostos em Angola)</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-200">
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Recursos Humanos</h4>
                <p className="text-gray-600">Gestão e desenvolvimento de recursos humanos</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Outros Serviços */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <Lightbulb className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-3xl font-bold text-gray-900">Outros Serviços</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200">
                <Smartphone className="h-12 w-12 text-purple-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Planilhas e Aplicativos</h4>
                <p className="text-gray-600">Venda de planilhas de gestão e aplicativos</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200">
                <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Cursos Online</h4>
                <p className="text-gray-600">Formação online em diversas áreas</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200">
                <Globe className="h-12 w-12 text-purple-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Marketing Digital</h4>
                <p className="text-gray-600">Estratégias de marketing e vendas online</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200">
                <Briefcase className="h-12 w-12 text-purple-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900">Serviços Gerais</h4>
                <p className="text-gray-600">Prestação de serviços gerais de manutenção</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Especialização */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Áreas de Especialização</h2>
            <p className="text-xl text-gray-600">Expertise em múltiplas áreas do conhecimento empresarial</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              "Desenvolvimento Pessoal",
              "Finanças",
              "Marketing e Vendas",
              "Cursos Online",
              "Impostos",
              "Recursos Humanos",
              "Planos Estratégicos",
              "Aplicativos"
            ].map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-blue-200 hover:border-blue-400 transition-all duration-300"
              >
                <span className="text-gray-800 font-semibold">{area}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para Transformar Seu Negócio?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Junte-se a centenas de empresas e profissionais que já confiam na BusinessWave para crescer e prosperar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 h-14 text-lg font-semibold" asChild>
                <Link href="/register">
                  Comece Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 text-lg font-semibold" asChild>
                <Link href="/services">
                  Conheça Nossos Serviços
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
