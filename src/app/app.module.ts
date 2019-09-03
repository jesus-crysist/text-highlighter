import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ColorPickerComponent } from 'src/app/color-picker/color-picker.component';
import { HighlightListComponent } from 'src/app/highlight-list/highlight-list.component';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';

import { AppComponent } from './app.component';
import { HighlightTableComponent } from './highlight-table/highlight-table.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TextHighlighterComponent } from './text-highlighter/text-highlighter.component';

const ROUTES: Routes = [
  { path: 'text-highlight-area', component: TextHighlighterComponent},
  { path: 'highlight-list', component: HighlightListComponent},
  { path: '**', redirectTo: '/text-highlight-area'}
];

@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    TextHighlighterComponent,
    HighlightTableComponent,
    TextAreaComponent,
    HighlightListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [TextHighlighterStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
