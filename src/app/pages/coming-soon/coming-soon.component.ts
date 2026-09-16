import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  standalone: false,
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
})
export class ComingSoonComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('kpiReveal') kpiRevealEls!: QueryList<ElementRef<HTMLElement>>;

  showCapabilities = false;

  umbrellaItems = [
    'coming_framework_item_sdk',
    'coming_framework_item_envs',
    'coming_framework_item_payments',
    'coming_framework_item_components',
    'coming_framework_item_integrations',
    'coming_framework_item_settings',
    'coming_framework_item_standards',
  ];

  readonly elmProducts = [
    'coming_elm_product_tawakkalna',
    'coming_elm_product_payments',
    'coming_elm_product_yaqeen',
    'coming_elm_product_muqeem',
    'coming_elm_product_natheer',
    'coming_elm_product_tam',
    'coming_elm_product_nafath',
    'coming_elm_product_efada',
    'coming_elm_product_wahed',
    'coming_elm_product_smart_gateway',
  ];

  readonly valueFlowSteps = [
    'sdk_landing_value_step1',
    'sdk_landing_value_step2',
    'sdk_landing_value_step3',
    'sdk_landing_value_step4',
    'sdk_landing_value_step5',
  ];

  readonly dxFlowSteps = [
    'sdk_landing_dx_step1',
    'sdk_landing_dx_step2',
    'sdk_landing_dx_step3',
    'sdk_landing_dx_step4',
    'sdk_landing_dx_step5',
  ];

  readonly journeyCurrentSteps = [
    'sdk_landing_journey_current_1',
    'sdk_landing_journey_current_2',
    'sdk_landing_journey_current_3',
    'sdk_landing_journey_current_4',
    'sdk_landing_journey_current_5',
    'sdk_landing_journey_current_6',
    'sdk_landing_journey_current_7',
    'sdk_landing_journey_current_8',
    'sdk_landing_journey_current_9',
    'sdk_landing_journey_current_10',
    'sdk_landing_journey_current_11',
  ];

  readonly journeyTargetSteps = [
    'sdk_landing_journey_target_1',
    'sdk_landing_journey_target_2',
    'sdk_landing_journey_target_3',
    'sdk_landing_journey_target_4',
    'sdk_landing_journey_target_5',
    'sdk_landing_journey_target_6',
    'sdk_landing_journey_target_7',
  ];

  readonly reuseItems = [
    'sdk_landing_reuse_item_1',
    'sdk_landing_reuse_item_2',
    'sdk_landing_reuse_item_3',
    'sdk_landing_reuse_item_4',
    'sdk_landing_reuse_item_5',
    'sdk_landing_reuse_item_6',
    'sdk_landing_reuse_item_7',
    'sdk_landing_reuse_item_8',
    'sdk_landing_reuse_item_9',
    'sdk_landing_reuse_item_10',
    'sdk_landing_reuse_item_11',
    'sdk_landing_reuse_item_12',
    'sdk_landing_reuse_item_13',
  ];

  readonly capabilityItems = [
    'sdk_landing_cap_1',
    'sdk_landing_cap_2',
    'sdk_landing_cap_3',
    'sdk_landing_cap_4',
    'sdk_landing_cap_5',
    'sdk_landing_cap_6',
    'sdk_landing_cap_7',
    'sdk_landing_cap_8',
    'sdk_landing_cap_9',
    'sdk_landing_cap_10',
    'sdk_landing_cap_11',
    'sdk_landing_cap_12',
    'sdk_landing_cap_13',
    'sdk_landing_cap_14',
    'sdk_landing_cap_15',
    'sdk_landing_cap_16',
    'sdk_landing_cap_17',
    'sdk_landing_cap_18',
  ];

  readonly baselineMetrics = [
    {
      title: 'sdk_landing_metrics_card1_title',
      baseline: 'sdk_landing_metrics_card1_baseline',
      target: 'sdk_landing_metrics_card1_target',
      delta: 'sdk_landing_metrics_card1_delta',
    },
    {
      title: 'sdk_landing_metrics_card2_title',
      baseline: 'sdk_landing_metrics_card2_baseline',
      target: 'sdk_landing_metrics_card2_target',
      delta: 'sdk_landing_metrics_card2_delta',
    },
    {
      title: 'sdk_landing_metrics_card3_title',
      baseline: 'sdk_landing_metrics_card3_baseline',
      target: 'sdk_landing_metrics_card3_target',
      delta: 'sdk_landing_metrics_card3_delta',
    },
    {
      title: 'sdk_landing_metrics_card4_title',
      baseline: 'sdk_landing_metrics_card4_baseline',
      target: 'sdk_landing_metrics_card4_target',
      delta: 'sdk_landing_metrics_card4_delta',
    },
  ];

  readonly adoptionMetrics = [
    {
      title: 'sdk_landing_metrics_card5_title',
      value: 'sdk_landing_metrics_card5_value',
      body: 'sdk_landing_metrics_card5_body',
    },
    {
      title: 'sdk_landing_metrics_card6_title',
      value: 'sdk_landing_metrics_card6_value',
      body: 'sdk_landing_metrics_card6_body',
    },
  ];

  readonly scaleUpItems = [
    'sdk_landing_scale_item1',
    'sdk_landing_scale_item2',
    'sdk_landing_scale_item5',
  ];

  readonly scaleDownItems = [
    'sdk_landing_scale_item3',
    'sdk_landing_scale_item4',
  ];

  private observer?: IntersectionObserver;
  private revealFallbackTimer?: ReturnType<typeof setTimeout>;
  private changesSub?: { unsubscribe: () => void };

  ngAfterViewInit(): void {
    this.revealFallbackTimer = setTimeout(() => this.setupReveal(), 0);
    this.changesSub = this.kpiRevealEls?.changes?.subscribe(() => {
      this.observer?.disconnect();
      this.setupReveal();
    });
  }

  ngOnDestroy(): void {
    if (this.revealFallbackTimer) {
      clearTimeout(this.revealFallbackTimer);
    }
    this.changesSub?.unsubscribe();
    this.observer?.disconnect();
  }

  toggleCapabilities(): void {
    this.showCapabilities = !this.showCapabilities;
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

    this.revealFallbackTimer = setTimeout(() => {
      elements.forEach((ref) => reveal(ref.nativeElement));
    }, 400);
  }
}
