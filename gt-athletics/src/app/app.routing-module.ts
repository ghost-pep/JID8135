import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';
const appRoutes: Routes = [
    { path: 'policy', component: PolicyComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}
