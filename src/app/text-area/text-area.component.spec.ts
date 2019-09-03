import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let debugElement: DebugElement;
  let textAreaDe: DebugElement;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [TextAreaComponent]
        })
        .compileComponents();

      fixture = TestBed.createComponent(TextAreaComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      fixture.detectChanges();

      // getting reference to the "text area" element
      textAreaDe = debugElement.query(By.css('div.textarea'));
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have textarea to type in', () => {
    expect(textAreaDe).toBeTruthy();
  });

  it('should emit "textHighlighted" when text is selected', () => {

    // creating text node as Range can be set only on TextNodes
    const textNode = document.createTextNode('The quick brown fox jumps over the lazy dog.');
    textAreaDe.nativeNode.appendChild(textNode);

    // necessary as selecting text won't happen if there is no color selected
    component.highlighterColor = 'green';
    fixture.detectChanges();

    let expectedModel = '';
    component.textHighlighted.subscribe(value => {
      expectedModel = value;
    });

    // creating "mock" selection range for given text
    const range = document.createRange();
    range.selectNode(textNode);
    range.setStart(textNode, 10);
    range.setEnd(textNode, 19);

    const selection = window.getSelection();
    selection.addRange(range);

    // mocking "mouseUp" event to trigger "endSelecting" method
    textAreaDe.triggerEventHandler('mouseup', {
      target: textAreaDe.nativeElement
    });

    expect(expectedModel).toEqual('brown fox');
  });
});
