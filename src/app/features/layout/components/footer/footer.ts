import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { I18nService } from '../../../../core/services/i18n';

interface FooterTexts {
  rights: string;
  madeWith: string;
}

const TEXTS: { pt: FooterTexts; en: FooterTexts } = {
  pt: { rights: 'Todos os direitos reservados.', madeWith: 'Feito com' },
  en: { rights: 'All rights reserved.', madeWith: 'Made with' },
};

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly i18n = inject(I18nService);
  readonly texts = computed(() => this.i18n.t(TEXTS));
  readonly year = new Date().getFullYear();
}
