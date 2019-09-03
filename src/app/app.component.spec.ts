import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ColorPickerComponent } from 'src/app/color-picker/color-picker.component';
import { HighlightTableComponent } from 'src/app/highlight-table/highlight-table.component';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';
import { TextAreaComponent } from 'src/app/text-area/text-area.component';
import { TextHighlighterComponent } from 'src/app/text-highlighter/text-highlighter.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          TextHighlighterComponent,
          ColorPickerComponent,
          TextAreaComponent,
          HighlightTableComponent
        ],
        providers: [
          TextHighlighterStore
        ],
        imports: [
          RouterTestingModule
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    })
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have necessary properties`, () => {
    expect(component.title).toEqual('Text Highlighter App');
  });

  it('should render navigation', () => {

    const navigationLinksDe = debugElement.queryAll(By.css('nav a'));
    expect(navigationLinksDe).toBeTruthy();

    const navigationLinksElements = navigationLinksDe.map(nlde => nlde.nativeElement);

    expect(navigationLinksElements[0].getAttribute('routerLink')).toBe('/text-highlight-area');
    expect(navigationLinksElements[1].getAttribute('routerLink')).toBe('/highlight-list');
  });
});
