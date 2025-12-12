import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";

interface SendEmailParams {
    to: string | string[];
    subject: string;
    title?: string;
    body: string;
    attachments?: {
        filename: string;
        path: string;
        cid?: string;
    }[];
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    async sendEmail({
        to,
        subject,
        title = "Notificação",
        body,
        attachments = [],
    }: SendEmailParams) {
        const html = await this.renderHTMLLayout({ title, body });

        // Ensure attachments array is not mutated and logo is always attached
        const logoAttachment = {
            filename: "logo.png",
            path: path.resolve(process.cwd(), "public/image/logo.png"),
            cid: "logo@cid",
        };

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: Array.isArray(to) ? to.join(", ") : to,
            subject,
            html,
            attachments: [...(attachments || []), logoAttachment],
        });
    }

    private async renderHTMLLayout({ title, body }: { title: string; body: string }) {
        const layoutPath = path.resolve(process.cwd(), "public/email-templates/views/baseMessage.handlebars");
        const layoutContent = await fs.readFile(layoutPath, "utf-8");

        return layoutContent
            .replace("{{title}}", title)
            .replace("{{body}", body);
    }

    async sendConfirmationEmail({
        to,
        name,
        username,
        password,
    }: {
        to: string;
        name: string;
        username: string;
        password: string;
    }) {
        const subject = "CREDENCIAIS DE ACESSO";
        const body = `
          <div style="font-family: Arial, sans-serif; color: #222;">
        <p>Olá <strong>${name}</strong>,</p>
        <p>Você foi registrado com sucesso.</p>
        <p>Suas credenciais:</p>
        <div style="background: #f5f5f5; padding: 12px 18px; border-radius: 6px; margin-bottom: 16px;">
          <strong>Usuário:</strong> ${username} <br>
          <strong>Senha:</strong> ${password}
        </div>
        <a href="https://sgi.mos.ao/" 
           style="display: inline-block; padding: 10px 22px; background: #0078d4; color: #fff; border-radius: 4px; text-decoration: none; font-weight: bold;">
          Acessar Sistema
        </a>
          </div>
        `;
        await this.sendEmail({ to, subject, body, title: "Confirmação de Cadastro" });
    }
}
