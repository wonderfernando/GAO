import { NextRequest, NextResponse } from "next/server";

export function logMiddleware(req: NextRequest) {
    if (process.env.NODE_ENV === "development") {
        console.log(`[LOG] ${req.method} ${req.nextUrl.pathname}`);
    }

    return NextResponse.next();
}



function formatContato(value: string) {
    // Remove tudo que não for dígito e limita a 9 dígitos
    const digits = String(value).replace(/\D/g, '').slice(0, 9);
    if (digits.length === 0) return '';
    // Aplica a formatação: +244 XXX XXX XXX
    let formatted = '+244';
    if (digits.length > 0) {
        formatted += ' ' + digits.slice(0, 3);
    }
    if (digits.length > 3) {
        formatted += ' ' + digits.slice(3, 6);
    }
    if (digits.length > 6) {
        formatted += ' ' + digits.slice(6, 9);
    }
    return formatted.trim();
}