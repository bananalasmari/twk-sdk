import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  standalone: false,
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
})
export class ComingSoonComponent {
  umbrellaItems = [
    'coming_framework_item_sdk',
    'coming_framework_item_envs',
    'coming_framework_item_payments',
    'coming_framework_item_components',
    'coming_framework_item_integrations',
    'coming_framework_item_settings',
    'coming_framework_item_standards',
  ];
}
