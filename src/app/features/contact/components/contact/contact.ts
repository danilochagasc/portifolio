import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/services/i18n';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal/scroll-reveal';

interface ContactTexts {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  errorRequired: string;
  errorEmail: string;
  errorMinLength: string;
}

const TEXTS: { pt: ContactTexts; en: ContactTexts } = {
  pt: {
    title: 'Contato',
    subtitle: 'Tem um projeto em mente? Vamos conversar.',
    name: 'Nome',
    namePlaceholder: 'Seu nome',
    email: 'Email',
    emailPlaceholder: 'seu@email.com',
    message: 'Mensagem',
    messagePlaceholder: 'Sua mensagem...',
    send: 'Enviar Mensagem',
    sending: 'Enviando...',
    success: 'Mensagem enviada com sucesso!',
    errorRequired: 'Campo obrigatório',
    errorEmail: 'Email inválido',
    errorMinLength: 'Mínimo de 10 caracteres',
  },
  en: {
    title: 'Contact',
    subtitle: 'Have a project in mind? Let\'s talk.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    message: 'Message',
    messagePlaceholder: 'Your message...',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    errorRequired: 'Required field',
    errorEmail: 'Invalid email',
    errorMinLength: 'Minimum 10 characters',
  },
};

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly i18n = inject(I18nService);

  readonly texts = computed(() => this.i18n.t(TEXTS));
  readonly isSending = signal(false);
  readonly isSent = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSending.set(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.isSending.set(false);
    this.isSent.set(true);
    this.form.reset();
    setTimeout(() => this.isSent.set(false), 4000);
  }
}
