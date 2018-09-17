import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing-module';
import { AppComponent } from './app.component';
import { PolicyComponent } from './policy/policy.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
