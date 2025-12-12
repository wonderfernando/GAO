// lib/cronJob.ts
import cron from 'node-cron';
import { sendEmail } from './smtp';
 

// Função para enviar e-mails
export const sendScheduledEmails = async () => {
    const to = 'dev.antoniomachado@gmail.com'; // Altere para o destinatário desejado
    const subject = 'Email Programado';
    const text = 'Este é um e-mail enviado por um cron job.';
    const html = '<p>Este é um e-mail enviado por um cron job.</p>';

    await sendEmail(to, subject, text, html);
};

// Agendar o cron job para rodar a cada minuto
cron.schedule('* * * * *', () => {
    console.log('Executando o cron job para enviar e-mails...');
    sendScheduledEmails();
});