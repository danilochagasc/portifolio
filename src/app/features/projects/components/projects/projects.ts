import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { I18nService } from '../../../../core/services/i18n';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';

interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  projectUrl: string;
  githubUrl: string;
}

interface ProjectsTexts {
  title: string;
  subtitle: string;
  viewProject: string;
  viewCode: string;
  projects: ProjectItem[];
}

const TEXTS: { pt: ProjectsTexts; en: ProjectsTexts } = {
  pt: {
    title: 'Projetos',
    subtitle: 'Alguns dos projetos que desenvolvi.',
    viewProject: 'Ver Projeto',
    viewCode: 'Código',
    projects: [
      {
        name: 'API Gateway Microservices',
        description: 'Gateway centralizado para gerenciamento de microsserviços com autenticação, rate limiting e logging distribuído.',
        technologies: ['Kotlin', 'Spring Cloud', 'Redis', 'Docker'],
        projectUrl: '',
        githubUrl: 'https://github.com',
      },
      {
        name: 'Sistema de Notificações',
        description: 'Plataforma de notificações em tempo real com suporte a múltiplos canais (push, email, SMS) e filas de processamento.',
        technologies: ['Java', 'Kafka', 'WebSocket', 'PostgreSQL'],
        projectUrl: '',
        githubUrl: 'https://github.com',
      },
      {
        name: 'Dashboard Analytics',
        description: 'Dashboard interativo com gráficos em tempo real para monitoramento de métricas e KPIs de negócio.',
        technologies: ['Angular', 'TypeScript', 'D3.js', 'Node.js'],
        projectUrl: 'https://example.com',
        githubUrl: 'https://github.com',
      },
      {
        name: 'CLI Automação DevOps',
        description: 'Ferramenta CLI para automatização de pipelines CI/CD, deploy e gerenciamento de infraestrutura.',
        technologies: ['Go', 'AWS SDK', 'Terraform', 'Docker'],
        projectUrl: '',
        githubUrl: 'https://github.com',
      },
    ],
  },
  en: {
    title: 'Projects',
    subtitle: 'Some of the projects I\'ve built.',
    viewProject: 'View Project',
    viewCode: 'Code',
    projects: [
      {
        name: 'API Gateway Microservices',
        description: 'Centralized gateway for microservice management with authentication, rate limiting, and distributed logging.',
        technologies: ['Kotlin', 'Spring Cloud', 'Redis', 'Docker'],
        projectUrl: '',
        githubUrl: 'https://github.com',
      },
      {
        name: 'Notification System',
        description: 'Real-time notification platform with support for multiple channels (push, email, SMS) and processing queues.',
        technologies: ['Java', 'Kafka', 'WebSocket', 'PostgreSQL'],
        projectUrl: '',
        githubUrl: 'https://github.com',
      },
      {
        name: 'Analytics Dashboard',
        description: 'Interactive dashboard with real-time charts for monitoring business metrics and KPIs.',
        technologies: ['Angular', 'TypeScript', 'D3.js', 'Node.js'],
        projectUrl: 'https://example.com',
        githubUrl: 'https://github.com',
      },
      {
        name: 'DevOps Automation CLI',
        description: 'CLI tool for CI/CD pipeline automation, deployment, and infrastructure management.',
        technologies: ['Go', 'AWS SDK', 'Terraform', 'Docker'],
        projectUrl: '',
        githubUrl: 'https://github.com',
      },
    ],
  },
};

@Component({
  selector: 'app-projects',
  imports: [ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  private readonly i18n = inject(I18nService);
  readonly texts = computed(() => this.i18n.t(TEXTS));
  readonly projects = computed(() => this.texts().projects);
}
