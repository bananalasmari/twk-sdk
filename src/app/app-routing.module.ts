import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { OuterLayoutsComponent } from './layouts/outer-layouts/outer-layouts.component';

const routes: Routes = [
  {
    path: '',
    component: OuterLayoutsComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'documentation', component: DocumentationComponent }
    ]
  },
  { path: '**', redirectTo: '' }  // Wildcard route for 404 - redirect to home or any other component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}