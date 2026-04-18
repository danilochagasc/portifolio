import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { I18nService } from '../../../../core/services/i18n';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  technologies: string[];
  responsibilities: string[];
}

interface AboutTexts {
  title: string;
  subtitle: string;
  summary: string;
  experienceTitle: string;
  experiences: ExperienceItem[];
}

const TEXTS: { pt: AboutTexts; en: AboutTexts } = {
  pt: {
    title: 'Sobre Mim',
    subtitle: 'Minha trajetória profissional e experiência.',
    summary: 'Engenheiro de Software Backend com experiência em sistemas de alta escala, processando milhões de transações diárias. Bacharel em Ciência da Computação pela UFLA e mestrando na mesma instituição. Domínio em Java, Kotlin (Spring Boot), TypeScript (Angular) e Python, com vivência em arquiteturas de microsserviços, mensageria e práticas de observabilidade. Forte capacidade analítica e foco em soluções robustas e escaláveis.',
    experienceTitle: 'Experiência',
    experiences: [
      {
        company: 'iFood',
        role: 'Engenheiro de Software Backend',
        period: 'Jan 2026 - Presente',
        technologies: ['Kotlin', 'Spring Boot', 'Kafka', 'SQS', 'AWS', 'Docker', 'Kubernetes', 'Datadog', 'PostgreSQL'],
        responsibilities: [
          'Desenvolvimento e manutenção de microsserviços na plataforma de pagamentos, responsável por mais de 6 milhões de transações/dia',
          'Integração entre as plataformas iFood e Uber, expandindo funcionalidades para milhões de usuários',
          'Implementação de serviços financeiros: meios de pagamento, conciliação e integrações com adquirentes',
          'Deploys com estratégia canary release, monitoramento com Datadog e resolução de incidentes em produção',
          'Aplicação de arquitetura hexagonal, DDD e CQRS em sistemas distribuídos de alta disponibilidade',
        ],
      },
      {
        company: 'iFood',
        role: 'Estagiário de Engenharia de Software',
        period: 'Fev 2025 - Dez 2025',
        technologies: ['Kotlin', 'Spring Boot', 'Python', 'Kafka', 'Datadog', 'Docker'],
        responsibilities: [
          'Desenvolvimento e manutenção de APIs backend em sistemas de pagamentos de alta escala',
          'Automação da retokenização de cartões com falha via script Python e cron job, aumentando a taxa de recuperação',
          'Configuração e suporte a meios de pagamento e integrações com adquirentes',
          'Implementação de testes automatizados e monitoramento de serviços em produção com Datadog',
        ],
      },
      {
        company: 'Emakers Jr',
        role: 'Desenvolvedor Fullstack',
        period: 'Jun 2023 - Abr 2025',
        technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'MySQL', 'AdonisJS', 'Mercado Pago'],
        responsibilities: [
          'Desenvolvimento e manutenção do backend do sistema Redação Inteligente, plataforma de correção de redações',
          'Migração do gateway de pagamento de PagBank para Mercado Pago, adicionando suporte a Pix',
          'Evolução da arquitetura: migração de AdonisJS para Java/Spring Boot e de MySQL para PostgreSQL',
          'Criação de treinamentos técnicos e documentação para capacitação interna da equipe',
        ],
      },
      {
        company: 'Nexos Digital',
        role: 'Desenvolvedor Fullstack (Estágio)',
        period: 'Out 2024 - Jan 2025',
        technologies: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL'],
        responsibilities: [
          'Desenvolvimento fullstack na plataforma Mercap Solutions para distribuição de renda fixa no mercado de capitais',
          'Implementação de automação de mailing com atualizações de mercado',
          'Criação de funcionalidades para geração e download de planilhas automatizadas',
        ],
      },
    ],
  },
  en: {
    title: 'About Me',
    subtitle: 'My professional journey and experience.',
    summary: 'Backend Software Engineer with experience in large-scale systems processing millions of daily transactions. Bachelor\'s degree in Computer Science from UFLA, currently pursuing a Master\'s degree at the same institution. Proficient in Java, Kotlin (Spring Boot), TypeScript (Angular), and Python, with expertise in microservices architectures, messaging, and observability practices. Strong analytical mindset and focus on building robust, scalable solutions.',
    experienceTitle: 'Experience',
    experiences: [
      {
        company: 'iFood',
        role: 'Backend Software Engineer',
        period: 'Jan 2026 - Present',
        technologies: ['Kotlin', 'Spring Boot', 'Kafka', 'SQS', 'AWS', 'Docker', 'Kubernetes', 'Datadog', 'PostgreSQL'],
        responsibilities: [
          'Develop and maintain microservices on the payments platform, handling over 6 million transactions per day',
          'Integrated iFood and Uber platforms, expanding features for millions of users',
          'Implement financial services including payment methods, reconciliation, and acquirer integrations',
          'Canary release deployments, Datadog monitoring, and production incident resolution',
          'Applying hexagonal architecture, DDD, and CQRS in high-availability distributed systems',
        ],
      },
      {
        company: 'iFood',
        role: 'Software Engineering Intern',
        period: 'Feb 2025 - Dec 2025',
        technologies: ['Kotlin', 'Spring Boot', 'Python', 'Kafka', 'Datadog', 'Docker'],
        responsibilities: [
          'Developed and maintained backend APIs for large-scale payment systems',
          'Automated failed card retokenization via Python cron job, improving card recovery rate',
          'Configured and supported payment methods and acquirer integrations',
          'Implemented automated tests and monitored production services with Datadog',
        ],
      },
      {
        company: 'Emakers Jr',
        role: 'Fullstack Developer',
        period: 'Jun 2023 - Apr 2025',
        technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'MySQL', 'AdonisJS', 'Mercado Pago'],
        responsibilities: [
          'Developed and maintained the backend of Redação Inteligente, an essay grading platform',
          'Migrated payment gateway from PagBank to Mercado Pago, adding Pix support',
          'Led architecture evolution: AdonisJS to Java/Spring Boot, MySQL to PostgreSQL',
          'Created technical training materials and documentation for the team',
        ],
      },
      {
        company: 'Nexos Digital',
        role: 'Fullstack Developer (Intern)',
        period: 'Oct 2024 - Jan 2025',
        technologies: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL'],
        responsibilities: [
          'Built fullstack features on the Mercap Solutions platform for fixed-income product distribution',
          'Implemented automated mailing with market updates to increase user engagement',
          'Developed automated spreadsheet generation and download features',
        ],
      },
    ],
  },
};

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly i18n = inject(I18nService);
  readonly texts = computed(() => this.i18n.t(TEXTS));
  readonly experiences = computed(() => this.texts().experiences);
}
