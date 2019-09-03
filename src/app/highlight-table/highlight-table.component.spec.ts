import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightTableComponent } from './highlight-table.component';

const highlightMocks = [
  {
    color: 'red',
    text: 'brown fox'
  },
  {
    color: 'yellow',
    text: 'lazy dog'
  },
  {
    color: 'red',
    text: 'red fox'
  }
];

describe('HighlightTableComponent', () => {
  let component: HighlightTableComponent;
  let fixture: ComponentFixture<HighlightTableComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HighlightTableComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(HighlightTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of highlights', () => {

    component.highlights = highlightMocks;
    fixture.detectChanges();

    const highlightListElements = debugElement.queryAll(By.css('li'));
    const removeButtonList = debugElement.queryAll(By.css('li button'));

    expect(highlightListElements.length).toBe(3);
    expect(removeButtonList.length).toBe(3);
  });

  it('should display message if there are no highlights', () => {

    const paragraph = debugElement.query(By.css('p'));

    expect(paragraph).toBeDefined();
    expect(paragraph.nativeElement.textContent).toContain('No highlights.');
  });

  it('should remove highlight if clicked on "remove" icon besides it', () => {

    spyOn(component, 'removeHighlight').and.callThrough();
    spyOn(component.remove, 'emit').and.stub();

    component.highlights = highlightMocks;
    fixture.detectChanges();

    const removeButtonList = debugElement.queryAll(By.css('li button'));

    const firstRemoveButtonEl = removeButtonList[0];
    firstRemoveButtonEl.triggerEventHandler('click', {target: firstRemoveButtonEl.nativeElement});
    fixture.detectChanges();

    expect(component.removeHighlight).toHaveBeenCalledWith(highlightMocks[0]);
    expect(component.remove.emit).toHaveBeenCalledWith(highlightMocks[0]);
  });
});
