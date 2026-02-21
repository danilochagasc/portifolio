import { Directive, ElementRef, input, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  delay = input<number>(0);
  threshold = input<number>(0.15);

  ngOnInit(): void {
    const element = this.el.nativeElement as HTMLElement;
    element.classList.add('reveal');

    if (this.delay() > 0) {
      element.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: this.threshold() }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
