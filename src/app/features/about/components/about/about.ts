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
    summary: 'Engenheiro de Software com foco em Backend, apaixonado por construir sistemas escaláveis e de alta performance. Atualmente trabalhando no iFood, uma das maiores plataformas de delivery da América Latina, onde contribuo para soluções que atendem milhões de usuários diariamente.',
    experienceTitle: 'Experiência',
    experiences: [
      {
        company: 'iFood',
        role: 'Engenheiro de Software Backend',
        period: 'Jan 2025 - Presente',
        technologies: ['Kotlin', 'Spring Boot', 'AWS', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
        responsibilities: [
          'Desenvolvimento e manutenção de microsserviços de alta escala',
          'Arquitetura de soluções para processamento de milhões de requisições',
          'Code reviews e mentoria de desenvolvedores juniores',
          'Integração com serviços de mensageria e filas',
        ],
      },
      {
        company: 'Empresa Anterior',
        role: 'Desenvolvedor Backend Pleno',
        period: 'Mar 2023 - Dez 2024',
        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Docker'],
        responsibilities: [
          'Desenvolvimento de APIs RESTful',
          'Implementação de padrões de design e boas práticas',
          'Otimização de consultas e performance do banco de dados',
          'Migração de sistemas monolíticos para microsserviços',
        ],
      },
      {
        company: 'Primeira Empresa',
        role: 'Desenvolvedor Júnior',
        period: 'Jan 2022 - Fev 2023',
        technologies: ['Java', 'Angular', 'MySQL', 'Git'],
        responsibilities: [
          'Desenvolvimento de funcionalidades full-stack',
          'Participação em cerimônias ágeis',
          'Correção de bugs e melhorias de performance',
        ],
      },
    ],
  },
  en: {
    title: 'About Me',
    subtitle: 'My professional journey and experience.',
    summary: 'Software Engineer focused on Backend, passionate about building scalable and high-performance systems. Currently working at iFood, one of the largest delivery platforms in Latin America, where I contribute to solutions serving millions of users daily.',
    experienceTitle: 'Experience',
    experiences: [
      {
        company: 'iFood',
        role: 'Backend Software Engineer',
        period: 'Jan 2025 - Present',
        technologies: ['Kotlin', 'Spring Boot', 'AWS', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
        responsibilities: [
          'Development and maintenance of high-scale microservices',
          'Solution architecture for processing millions of requests',
          'Code reviews and mentorship of junior developers',
          'Integration with messaging services and queues',
        ],
      },
      {
        company: 'Previous Company',
        role: 'Mid-Level Backend Developer',
        period: 'Mar 2023 - Dec 2024',
        technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Docker'],
        responsibilities: [
          'Development of RESTful APIs',
          'Implementation of design patterns and best practices',
          'Database query optimization and performance tuning',
          'Migration from monolithic to microservices architecture',
        ],
      },
      {
        company: 'First Company',
        role: 'Junior Developer',
        period: 'Jan 2022 - Feb 2023',
        technologies: ['Java', 'Angular', 'MySQL', 'Git'],
        responsibilities: [
          'Full-stack feature development',
          'Participation in agile ceremonies',
          'Bug fixing and performance improvements',
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
