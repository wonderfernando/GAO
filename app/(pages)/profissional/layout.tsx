"use client"
import { useSession } from "next-auth/react";
import Header from "../feed/components/Header";
import { Role } from "../feed/menuItems";

export default function LayoutProfissional({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const user = session?.user;
    const tipo = session?.user?.tipo as Role | undefined;

 


    return (
    <div className="flex flex-col min-h-screen bg-white/50">
       <Header profile={user?.tipo} username={user?.nome}></Header>
        {children}
    </div>)
}