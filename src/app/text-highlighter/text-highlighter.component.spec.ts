import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPickerComponent } from 'src/app/color-picker/color-picker.component';
import { TextHighlighterStore } from 'src/app/state/text-highlighter-store.service';
import { TextAreaComponent } from 'src/app/text-area/text-area.component';

import { TextHighlighterComponent } from './text-highlighter.component';

describe('TextHighlighterComponent', () => {
  let component: TextHighlighterComponent;
  let fixture: ComponentFixture<TextHighlighterComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [
            TextHighlighterComponent,
            TextAreaComponent,
            ColorPickerComponent
          ],
          providers: [TextHighlighterStore]
        })
        .compileComponents();

      fixture = TestBed.createComponent(TextHighlighterComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render components', () => {

    const textAreaComponent = debugElement.query(By.css('app-text-area'));
    expect(textAreaComponent).toBeTruthy();

    const colorPickerComponent = debugElement.query(By.css('app-color-picker'));
    expect(colorPickerComponent).toBeTruthy();
  });

});
