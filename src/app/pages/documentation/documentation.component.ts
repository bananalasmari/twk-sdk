import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  standalone: false,
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  activeSection: string = 'getting-started';
  copiedStates: { [key: string]: boolean } = {};
  mobileMenuOpen: boolean = false;

  sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'device', title: 'Device APIs' },
    { id: 'user', title: 'User APIs' },
    { id: 'family', title: 'Family APIs' },
    { id: 'vehicles', title: 'Vehicles APIs' },
    { id: 'gallery', title: 'Gallery APIs' },
    { id: 'camera', title: 'Camera APIs' },
    { id: 'files', title: 'Files APIs' },
    { id: 'permissions', title: 'Permissions APIs' },
    { id: 'auth', title: 'Authentication APIs' },
    { id: 'share', title: 'Share APIs' },
    { id: 'navigation', title: 'Navigation APIs' },
    { id: 'scanner', title: 'Scanner APIs' },
    { id: 'cards', title: 'Cards APIs' },
    { id: 'payment', title: 'Payment APIs' },
    { id: 'utility', title: 'Utility Methods' },
    { id: 'convenience', title: 'Convenience Methods' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Documentation component initialized
  }

  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId;
    this.mobileMenuOpen = false; // Close mobile menu when clicking a section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  async copyCode(codeId: string, event: Event): Promise<void> {
    event.preventDefault();
    const codeElement = document.getElementById(codeId);

    if (codeElement) {
      const codeText = codeElement.textContent || '';

      try {
        await navigator.clipboard.writeText(codeText);
        this.copiedStates[codeId] = true;

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          this.copiedStates[codeId] = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  }

  isCopied(codeId: string): boolean {
    return this.copiedStates[codeId] || false;
  }
}

