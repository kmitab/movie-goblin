import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultBriefComponent } from './result-brief/result-brief.component';
import { ResultFullComponent } from './result-full/result-full.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { ResultBriefHorizontalComponent } from './result-brief-horizontal/result-brief-horizontal.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultBriefComponent,
    ResultFullComponent,
    EpisodesComponent,
    ResultBriefHorizontalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
