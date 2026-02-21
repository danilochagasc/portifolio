import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { I18nService } from '../../../../core/services/i18n';
import { ThemeService } from '../../../../core/services/theme';
import { ScrollService } from '../../../../core/services/scroll';

interface NavTexts {
  about: string;
  projects: string;
  contact: string;
  downloadCv: string;
}

const TEXTS: { pt: NavTexts; en: NavTexts } = {
  pt: {
    about: 'Sobre',
    projects: 'Projetos',
    contact: 'Contato',
    downloadCv: 'Baixar CV',
  },
  en: {
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    downloadCv: 'Download CV',
  },
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);
  private readonly scroll = inject(ScrollService);

  readonly isDark = this.theme.isDark;
  readonly currentLang = this.i18n.currentLang;
  readonly activeSection = this.scroll.activeSection;
  readonly mobileMenuOpen = signal(false);

  readonly texts = computed(() => this.i18n.t(TEXTS));
  readonly cvLink = computed(() =>
    this.currentLang() === 'pt' ? 'cv/cv-pt.pdf' : 'cv/cv-en.pdf'
  );

  readonly navLinks = computed(() => [
    { id: 'about', label: this.texts().about },
    { id: 'projects', label: this.texts().projects },
    { id: 'contact', label: this.texts().contact },
  ]);

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  toggleLang(): void {
    this.i18n.toggleLang();
  }

  scrollTo(id: string): void {
    this.scroll.scrollTo(id);
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
