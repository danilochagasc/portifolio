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
        name: 'E-commerce Microservices (TCC)',
        description: 'Backend de um E-commerce distribuído construído para pesquisa e validação arquitetural em meu TCC. O sistema foi totalmente modelado utilizando Domain-Driven Design (DDD) e Arquitetura Hexagonal, com forte foco em baixo acoplamento e alta resiliência entre os domínios.',
        technologies: ['Kotlin', 'Spring Boot', 'Microsserviços', 'PostgreSQL', 'Redis', 'Docker', 'AWS S3'],
        projectUrl: '',
        githubUrl: 'https://github.com/danilochagasc/ecommerce-tcc',
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
        name: 'E-commerce Microservices (TCC)',
        description: 'Distributed E-commerce backend built for architectural research and validation for my final degree project. The system was fully modeled using Domain-Driven Design (DDD) and Hexagonal Architecture principles, heavily focusing on loose coupling and high domain resilience.',
        technologies: ['Kotlin', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Redis', 'Docker', 'AWS S3'],
        projectUrl: '',
        githubUrl: 'https://github.com/danilochagasc/ecommerce-tcc',
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
