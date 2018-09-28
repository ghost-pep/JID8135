import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing-module';
import { AppComponent } from './app.component';
import { PolicyComponent } from './policy/policy.component';
import { SearchComponent } from './search/search.component';
import { QuillModule } from 'ngx-quill';
import { HomeComponent } from './home/home.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';
import { ViewPolicyComponent } from './view-policy/view-policy.component';

// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    PolicyComponent,
    SearchComponent,
    HomeComponent,
    EditPolicyComponent,
    ViewPolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    QuillModule,
    // PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
