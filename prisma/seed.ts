// Script para criar um usuário admin no banco de dados
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("kivembasoft@2025...", 10);

  const existingUsers = await prisma.usuario.findMany({
    where: {
      email: {
        in: [
          "admin@gmail.com",
          "antonioulundomachado@outlook.com",
          "admin@gmail.com",
        ],
      },
    },
  });

  if (existingUsers.length === 0) {
    const usuarios = await prisma.usuario.createMany({
      data: [
        {
          nome: "Kivemba Soft",
          email: "admin@gmail.com",
          senha: hashedPassword, // Apenas se armazenar hash da senha
          tipo: "ADMINISTRADOR", // Define o papel como ADMIN
        },
        {
          nome: "Programador",
          email: "dev.antoniomachado@gmail.com",
          senha: await bcrypt.hash("const=password2", 10), // Apenas se armazenar hash da senha
          tipo: "ADMINISTRADOR", // Define o papel como ADMIN
        },
        {
          nome: "Buisness Wave",
          email: "geral@buisnesswave.com",
          senha: await bcrypt.hash("bw@2025...", 10),
          tipo: "ADMINISTRADOR", // Define o papel como ADMIN
        },
      ],
      skipDuplicates: true, // Ignora duplicados com base em restrições únicas
    });
    console.log("Usuários criados com sucesso!");
  } else {
    console.log("Usuários já existem no banco de dados.");
  }

  const categorias = await prisma.categoria.findMany();
  if (categorias.length === 0) {
    const categoriasData = [
      { nome: "Desenvolvimento Web" },
      { nome: "Design Gráfico" },
      { nome: "Marketing Digital" },
      { nome: "Redação e Tradução" },
      { nome: "Consultoria de Negócios" },
      { nome: "Fotografia e Vídeo" },
      { nome: "Desenvolvimento de Aplicativos" },
      { nome: "Suporte Técnico" },
      { nome: "Tutoria e Educação" },
      { nome: "Saúde e Bem-Estar" },
      { nome: "Finanças e Contabilidade" },
      { nome: "Jurídico" },
      { nome: "Arquitetura e Engenharia" },
      { nome: "Música e Áudio" },
      {nome: "Artes e Entretenimento" },
      { nome: "Consultoria de TI" },
      { nome: "Administração e Assistência Virtual" }, 
      { nome: "Gestão de Projetos" },
      { nome: "Recursos Humanos" },
    ];

    await prisma.categoria.createMany({
      data: categoriasData,
      skipDuplicates: true,
    });
    console.log("Categorias criadas com sucesso!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
