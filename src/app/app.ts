import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { Navbar } from './features/layout/components/navbar/navbar';
import { Footer } from './features/layout/components/footer/footer';
import { Hero } from './features/hero/components/hero/hero';
import { About } from './features/about/components/about/about';
import { Projects } from './features/projects/components/projects/projects';
import { Contact } from './features/contact/components/contact/contact';
import { ScrollService } from './core/services/scroll';
import { NetworkBg } from './shared/components/network-bg/network-bg';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Hero, About, Projects, Contact, NetworkBg],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly scroll = inject(ScrollService);

  ngOnInit(): void {
    this.scroll.initSectionObserver(['hero', 'about', 'projects', 'contact']);
  }
}
