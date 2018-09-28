import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'policy', component: PolicyComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}
