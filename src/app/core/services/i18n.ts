import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'pt' | 'en';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly langSignal = signal<Lang>(this.getInitialLang());

  readonly currentLang = this.langSignal.asReadonly();
  readonly isPortuguese = computed(() => this.langSignal() === 'pt');

  toggleLang(): void {
    const next: Lang = this.langSignal() === 'pt' ? 'en' : 'pt';
    this.applyWithTransition(next);
  }

  setLang(lang: Lang): void {
    this.applyWithTransition(lang);
  }

  private applyWithTransition(lang: Lang): void {
    document.body.classList.add('lang-switching');

    setTimeout(() => {
      this.langSignal.set(lang);
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

      requestAnimationFrame(() => {
        document.body.classList.remove('lang-switching');
      });
    }, 200);
  }

  t<T>(translations: { pt: T; en: T }): T {
    return translations[this.langSignal()];
  }

  private getInitialLang(): Lang {
    const stored = localStorage.getItem('lang');
    if (stored === 'pt' || stored === 'en') return stored;
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  }
}
