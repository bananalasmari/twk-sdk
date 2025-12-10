import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentationComponent } from './documentation.component';

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sections defined', () => {
    expect(component.sections.length).toBeGreaterThan(0);
  });

  it('should set active section on scroll', () => {
    component.scrollToSection('device');
    expect(component.activeSection).toBe('device');
  });
});

