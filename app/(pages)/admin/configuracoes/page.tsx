import Link from "next/link";

const cards = [
  {
    title: "Menu",
    description: "Gerencie o menu do sistema.",
    href: "/admin/configuracoes/menu",
  },
  {
    title: "Utilizadores",
    description: "Gerencie os utilizadores.",
    href: "/admin/configuracoes/utilizadores",
  },
  {
    title: "Relatórios",
    description: "Acesse relatórios do sistema.",
    href: "/admin/configuracoes/relatorios",
  },
];

export default function ConfiguracoesPage() {
  return (
    <div>
      <h1>Configurações</h1>
      <p>Esta é a página de configurações do administrador.</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            style={{
              flex: 1,
              padding: "1.5rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              background: "#fafafa",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s",
            }}
          >
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
