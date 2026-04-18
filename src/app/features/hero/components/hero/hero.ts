import { Component, ChangeDetectionStrategy, inject, computed, OnInit, ElementRef } from '@angular/core';
import { I18nService } from '../../../../core/services/i18n';
import { ScrollService } from '../../../../core/services/scroll';
import { gsap } from 'gsap';

interface HeroTexts {
  greeting: string;
  name: string;
  role: string;
  description: string;
  cta: string;
  ctaSecondary: string;
}

const TEXTS: { pt: HeroTexts; en: HeroTexts } = {
  pt: {
    greeting: 'Olá, eu sou',
    name: 'Danilo Clemente',
    role: 'Engenheiro de Software Backend',
    description: 'Especialista em Backend com experiência em sistemas de pagamento de alta escala no iFood, processando mais de 6 milhões de transações por dia. Mestrando em Ciência da Computação na UFLA.',
    cta: 'Ver Projetos',
    ctaSecondary: 'Saiba Mais',
  },
  en: {
    greeting: 'Hi, I\'m',
    name: 'Danilo Clemente',
    role: 'Backend Software Engineer',
    description: 'Backend specialist with hands-on experience in large-scale payment systems at iFood, processing over 6 million transactions per day. M.Sc. student in Computer Science at UFLA.',
    cta: 'View Projects',
    ctaSecondary: 'Learn More',
  },
};

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements OnInit {
  private readonly i18n = inject(I18nService);
  private readonly scroll = inject(ScrollService);
  private readonly el = inject(ElementRef);

  readonly texts = computed(() => this.i18n.t(TEXTS));

  ngOnInit(): void {
    this.animateEntrance();
  }

  goToProjects(): void {
    this.scroll.scrollTo('projects');
  }

  goToAbout(): void {
    this.scroll.scrollTo('about');
  }

  private animateEntrance(): void {
    const root = this.el.nativeElement as HTMLElement;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(root.querySelector('.hero__greeting'), { opacity: 0, y: 30, duration: 0.6, delay: 0.2 })
      .from(root.querySelector('.hero__name'), { opacity: 0, y: 40, duration: 0.8 }, '-=0.3')
      .from(root.querySelector('.hero__role'), { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
      .from(root.querySelector('.hero__description'), { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from(root.querySelector('.hero__actions'), { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from(root.querySelector('.hero__glow--1'), { opacity: 0, scale: 0.5, duration: 1.2 }, '-=1')
      .from(root.querySelector('.hero__glow--2'), { opacity: 0, scale: 0.5, duration: 1.2 }, '-=1');
  }
}
