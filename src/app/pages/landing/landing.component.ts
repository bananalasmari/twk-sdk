import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('kpiReveal') kpiRevealEls!: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;
  private revealFallbackTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    // Defer so template refs are ready after HMR / change detection.
    this.revealFallbackTimer = setTimeout(() => this.setupReveal(), 0);
  }

  ngOnDestroy(): void {
    if (this.revealFallbackTimer) {
      clearTimeout(this.revealFallbackTimer);
    }
    this.observer?.disconnect();
  }

  private setupReveal(): void {
    const elements = this.kpiRevealEls?.toArray() ?? [];

    if (!elements.length) {
      return;
    }

    const reveal = (el: HTMLElement) => el.classList.add('is-visible');

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((ref) => reveal(ref.nativeElement));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          reveal(entry.target as HTMLElement);
          this.observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    elements.forEach((ref) => this.observer?.observe(ref.nativeElement));

    // Fail-open: never leave KPI cards stuck at opacity 0.
    this.revealFallbackTimer = setTimeout(() => {
      elements.forEach((ref) => reveal(ref.nativeElement));
    }, 400);
  }
}
