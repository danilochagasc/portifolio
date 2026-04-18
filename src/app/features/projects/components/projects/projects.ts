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
        description: 'Backend de um E-commerce completo arquitetado em microsserviços. Desenvolvido com Kotlin, Spring Boot, WebFlux, PostgreSQL e Redis, aplicando os conceitos de Domain-Driven Design (DDD) e Arquitetura Hexagonal.',
        technologies: ['Kotlin', 'Spring Boot', 'Microsserviços', 'PostgreSQL', 'Docker'],
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
        description: 'Complete E-commerce backend built with a microservices architecture. Developed using Kotlin, Spring Boot, WebFlux, PostgreSQL, and Redis, applying Domain-Driven Design (DDD) and Hexagonal Architecture principles.',
        technologies: ['Kotlin', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker'],
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
