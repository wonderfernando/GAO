import Queue, { Job } from "bull";
import { EmailService } from "./EmailService";
import dotenv from "dotenv";

dotenv.config();

interface QueueEmailData {
  to: string | string[];
  subject: string;
  body: string;
  title?: string;
}

export class EmailQueue {
  private queue: Queue.Queue<QueueEmailData>;
  private emailService: EmailService;

  constructor() {
    this.queue = new Queue("email-queue", {
      redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    this.emailService = new EmailService();

    this.processQueue();
  }

  /**
   * Adiciona um email à fila.
   */
  async addEmailToQueue(emailData: QueueEmailData) {
    const job = await this.queue.add(emailData, {
      attempts: 3,
      backoff: 5 * 60 * 1000, // 5 minutos de espera antes de tentar novamente
    });
    console.log(`🟡 Email agendado na fila (ID: ${job.id})`);
  }

  /**
   * Processamento da fila de e-mails.
   */
  private processQueue() {
    this.queue.process(async (job: Job<QueueEmailData>) => {
      try {
        const { to, subject, body, title } = job.data;

        await this.emailService.sendEmail({
          to,
          subject,
          body,
          title,
        });

        console.log(`✅ Email enviado com sucesso (Job ID: ${job.id})`);
      } catch (error) {
        console.error(`❌ Erro ao processar email (Job ID: ${job.id}):`, error);
        throw error; // Bull tentará novamente se necessário
      }
    });

    this.queue.on("failed", (job, err) => {
      console.error(
        `❌ Falha no envio do email (Job ID: ${job.id}): ${err.message}`
      );
    });

    this.queue.on("completed", (job) => {
      console.log(`✅ Job concluído (ID: ${job.id})`);
    });
  }
}
